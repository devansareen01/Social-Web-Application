const Post = require('../models/posts');

module.exports.toggle = async function (req, res) {
    try {
        const post = await Post.findById(req.query.id);

        let likeStatus;
        if (post.likes.includes(req.user.id)) {
            // If the user has already liked the post, unlike it
            await post.updateOne({ $pull: { likes: req.user.id } }).exec();
            likeStatus = false;
        } else {
            // If the user has not liked the post, like it
            await post.updateOne({ $push: { likes: req.user.id } }).exec();
            likeStatus = true;
        }

        const updatedPost = await Post.findById(req.query.id);
        const likesCount = updatedPost.likes.length;

        return res.json({ success: true, likes: likesCount, isLiked: likeStatus });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}



