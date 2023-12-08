const Comment = require('../models/comment');
const Post = require('../models/posts');

const commentMailer = require('../config/mailers/comments_mailer');
const Like = require('../models/like');



module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post).exec(); // Use exec() to execute the query

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: post,
                user: req.user,
                username: req.user.name,
                userAvatar: req.user.avatar
            });

            post.comments.push(comment);
            await post.save();

            commentMailer.newCommment(comment);



            res.redirect('/');
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("An error occurred.");
    }
}
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

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
        await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });

        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}