const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts_controlller');
const { model } = require('mongoose');

router.post('/create' , postController.create);

module.exports = router;