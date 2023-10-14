const express = require('express');

const router = express.Router();
const likeController = require('../controllers/likes_controller');

router.get('/toggle', likeController.toggle);


module.exports = router; 