const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts_controlller');

const passport = require('passport');

router.post('/create' , passport.checkAuthentication, postController.create);

module.exports = router;  