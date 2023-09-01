const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');


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
module.exports = router;