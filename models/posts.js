const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const MEDIA_PATH = path.join('/upload/posts/media');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,

        }
    ],
    media: {
        type: String
    }
}, {
    timestamps: true
});
let storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, path.join(__dirname, '..', MEDIA_PATH));

    },
    filename: function (req, file, callBack) {
        callBack(null, file.fieldname + '-' + Date.now());

    }

});

postSchema.statics.uploadedMedia = multer({ storage: storage }).single('media');
postSchema.statics.mediaPath = MEDIA_PATH;
const Post = mongoose.model('Post', postSchema);
module.exports = Post;