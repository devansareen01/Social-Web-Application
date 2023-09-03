const Post = require('../models/posts');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user
        });
        return res.redirect('back');
    } catch (error) {
        if (error) {
            console.log('error in creating post', error);
            return;
        }
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            // Post not found
            return res.redirect('back');
        }

        if (post.user.toString() === req.user.id) {
            await post.deleteOne();

            await Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');
        } else {
            // User is not authorized to delete this post
            return res.redirect('back');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('back');
    }
};


