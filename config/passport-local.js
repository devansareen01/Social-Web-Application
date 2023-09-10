const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function (req, email, password, done) { // Use an async function for asynchronous operations
        try {
            const user = await User.findOne({ email: email }); // Await the findOne operation

            if (!user) {
                req.flash('error', "Invalid Username/Password");
                return done(null, false);
            }

            // Perform password comparison here, you've commented this out
            if (password !== user.password) {
                req.flash('error', "Invalid Username/Password");
                return done(null, false);
            }

            return done(null, user);

        } catch (err) {
            req.flash('error', err);
            return done(err);
        }
    }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id); // Await the findById operation
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign_in');
}

// Set the authenticated user to res.locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Change req.User to req.user
    }
    next();
}

module.exports = passport;
