const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: '1038315613083-r46bgl12lpuge3gmmb3o5gjtnhtm2mq5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
    passReqToCallback: true,
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'email': profile.emails[0].value });

            if (existingUser) {
                return done(null, existingUser);
            }

            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false);
        }
    }
));

module.exports = passport;
