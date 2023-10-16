const { model } = require('mongoose');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const crypto = require('crypto');
const { renderTemplate } = require('../config/nodemailer');
const Friendship = require('../models/friendship');


module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);


        const friends = [];


        for (const friendId of user.friends) {
            const friend = await User.findById(friendId);
            if (friend) {
                friends.push(friend);
            }
        }


        return res.render('user_profile', {
            title: "USER Profile",
            profile_user: user,
            friends: friends
        });
    } catch (error) {
        console.log('Error in profile route:', error);
        res.redirect('back');
    }
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("Error uploading avatar:", err);
                    req.flash('error', 'Error uploading avatar.');
                    return res.redirect('back');
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {

                    // if (user.avatar) {
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }
                    // this is saving the path of the uploaded file in the avtar field in the user in mongodb
                    user.avatar = User.avatarPath + '/' + req.file.filename;

                }
                user.save();
                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', error);
            res.redirect('back');
        }
    } else {
        req.flash('error', "Unautorized!");
        return res.status(401).send('Unauthorized');
    }

}

//render sign in page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "VARTACHAT | Sign Up"
    });
}

//render sign up page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {

        title: "VARTACHAT | Sign In"

    });
}

//get the sign up data
module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            const createdUser = await User.create(req.body);

            return res.redirect('/users/sign_in');
        } else {
            req.flash('error', 'User Already Exists');
            return res.redirect('/users/sign_in');
        }
    } catch (err) {
        console.log('Error:', err);
        // Handle the error and send an appropriate response
        // For example: res.status(500).send('Internal Server Error');
    }
}


// sign in and create a session for user

module.exports.createSession = function (req, res) {
    console.log(req);
    req.flash('success', 'Sucessfully logged in');
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    // Set the flash message before calling req.logout()

    // Check if the flash message is set

    req.logout(function (err) {
        if (err) {
            console.error(err);
        }
        req.flash('success', 'Successfully logged out');
        return res.redirect('/');
    });
}





module.exports.forgetPassword = async function (req, res) {
    res.render('forgetPassword', {
        title: "Forget Password"
    })
}

module.exports.renderResetPassword = async function (req, res) {
    try {
        const { token } = req.query;

        // Find the user by the reset token and check if it's valid (e.g., not expired)
        const user = await User.findOne({
            resetPasswordToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            // Handle the case where the token is invalid or expired
            return res.status(400).send('Invalid or expired reset token.');
        }

        // Render the password reset page with the reset token
        res.render('resetPassword', {
            title: 'Reset Password',
            token: token // Pass the token to the view
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.resetPassword = async function (req, res) {
    try {
        const { token } = req.body;
        const { newPassword } = req.body;

        // Find the user by the reset token and check if it's valid (e.g., not expired)
        const user = await User.findOne({
            resetPasswordToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            // Handle the case where the token is invalid or expired
            return res.status(400).send('Invalid or expired reset token.');
        }

        // Update the user's password with the new password
        user.password = newPassword;

        // Clear the reset token and reset token expiration
        user.resetPasswordToken = undefined;
        user.resetTokenExpires = undefined;

        // Save the updated user object with the new password
        await user.save();

        // Respond to the user with a success message or redirect to a confirmation page
        res.render('passwordResetSuccess', {
            title: 'Password Reset Successful'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



module.exports.checkFriendShip = async (req, res) => {
    try {
        const { fromUserId, toUserId } = req.body;

        const existingFriendship = await Friendship.findOne({
            from_user: fromUserId,
            to_user: toUserId,
        });


        const isFriend = !!existingFriendship

        return res.json({ isFriend });

    } catch (error) {
        console.error('Error checking friendship status:', error);
        res.status(500).json({ error: 'Failed to check friendship status' });
    }
}

module.exports.addFreind = async (req, res) => {
    try {
        const { fromUserId, toUserId } = req.body;


        await Friendship.create({
            from_user: fromUserId,
            to_user: toUserId,
        });


        // also have to push in user's fiendship array


        await User.findByIdAndUpdate(fromUserId, { $push: { friends: toUserId } });
        return res.json({ message: 'Friend added successfully' });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ error: 'Failed to add friend' });
    }
}


module.exports.removeFriend = async (req, res) => {
    try {
        const { fromUserId, toUserId } = req.body;


        await Friendship.findOneAndDelete({
            from_user: fromUserId,
            to_user: toUserId,
        });


        //also pull out from friends array in users

        await User.findByIdAndUpdate(fromUserId, { $pull: { friends: toUserId } });
        res.json({ message: 'Friend removed successfully' });

    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ error: 'Failed to remove friend' });
    }
}

