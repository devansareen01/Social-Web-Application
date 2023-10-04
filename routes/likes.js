const express = require('express');

const router = express.Router();
const likeController = require('../controllers/likes_controller');

router.get('/toggle', (req, res) => {
    const postId = req.query.id; // Get the 'id' query parameter
    const type = req.query.type; // Get the 'type' query parameter


    // ...



}, likeController.toggleLike);

module.exports = router; 