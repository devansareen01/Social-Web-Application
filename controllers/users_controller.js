const { model } = require('mongoose');
const User = require('../models/user');

module.exports.profile = async function (req, res) {

    try {
        let user = await User.findById(req.params.id);

        return res.render('user_profile', {
            title: "USER Profile",
            profile_user: user
        });
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('back');
        } catch (error) {
            console.log(error);
            res.redirect('back');
        }
    } else {
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
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error:', err);
        // Handle the error and send an appropriate response
        // For example: res.status(500).send('Internal Server Error');
    }
}


// sign in and create a session for user

module.exports.createSession = function (req, res) {
    req.flash('success', 'Sucessfully logged in');
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    // Set the flash message before calling req.logout()
    req.flash('success', 'Successfully logged out');
    console.log(req.flash('success')); // Check if the flash message is set

    req.logout(function (err) {
        if (err) {
            console.error(err);
        }
        return res.redirect('/');
    });
}
