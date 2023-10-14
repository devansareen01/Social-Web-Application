const Post = require('../models/posts');

module.exports.toggle = async function (req, res) {
    try {
        const post = Post.findById(req.query.id);
        if (post.likes.find(uid => uid == req.user.id)) {
            likeStatus = true;
            post.updateOne(req.query.id, $pull{})
        }
        const likesCount = post.likes.length;

        return res.json({ success: true, likes: likesCount, isLiked: likeStatus });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

module.exports.unlike = async function (req, res) {
    try {
        const post = await Post.findByIdAndUpdate(req.query.id, {
            $pull: { likes: req.post.user.id }
        });

        const likesCount = post.likes.length;

        return res.json({ success: true, likes: likesCount });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

