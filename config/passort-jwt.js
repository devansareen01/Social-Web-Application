const passport = require('passport');
const JWT = require('passport-jwt').Strategy;
const extractJWt = require('passport-jwt').ExtractJwt;// help us extract jwt from the header

const User = require('../models/user');

let opts = {
    jwtFromRequest: extractJWt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "VartaChat"
}

passport.use(new JWT(opts, function (jwt_payload, done) {
    User.findById(jwt_payload._id, function (err, user) {
        if (err) {
            console.log("error in finding user from JWT ")
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;