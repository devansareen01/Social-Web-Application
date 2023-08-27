const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post).exec(); // Use exec() to execute the query

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            res.redirect('/');
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("An error occurred.");
    }
}
