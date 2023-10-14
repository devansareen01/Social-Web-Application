const express = require('express');

const router = express.Router();
const likeController = require('../controllers/likes_controller');

router.get('/like', likeController.like);
router.get('/unlike', likeController.unlike);

module.exports = router; 