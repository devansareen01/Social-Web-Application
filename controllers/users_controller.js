const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "USERS Profile",

    });
}
//render sign in page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "VARTACHAT | Sign Up"
    });
}

//render sign up page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "VARTACHAT | Sign In"
    });
}

//get the sign up data
module.exports.create = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

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

    return res.redirect('/users/profile');
}