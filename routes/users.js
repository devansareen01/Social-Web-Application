const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
const forgetPasswordMailer = require('../config/mailers/forgetPassword');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/sign_up', userController.signUp);
router.get('/sign_in', userController.signIn);

router.post('/create', userController.create);


//use passport as aa middleware to autehticate
router.post('/create-session', passport.authenticate(
    'local',

    { failureRedirect: '/users/sign_in' },
), userController.createSession);

router.get('/sign_out', userController.destroySession);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/sign_in',
    failureFlash: true,
    successFlash: true,
    successRedirect: '/users/auth/google/success'
}))

router.get('/auth/google/success', userController.createSession);

router.get('/forgetPassword', userController.forgetPassword);
router.post('/forgetPassword/initiatePasswordReset', forgetPasswordMailer.initiatePasswordReset);
router.get('/reset-password', userController.renderResetPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;