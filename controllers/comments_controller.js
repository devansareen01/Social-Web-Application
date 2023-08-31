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
module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            console.log("Comment not found");
            return res.redirect('back');
        }

        const postId = comment.post;
        await comment.deleteOne();
        
        await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: req.params.id } }
        );

        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
