const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId

    }

}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;