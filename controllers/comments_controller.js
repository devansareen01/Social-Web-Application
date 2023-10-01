const Comment = require('../models/comment');
const Post = require('../models/posts');

const commentMailer = require('../config/mailers/comments_mailer');

const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post).exec(); // Use exec() to execute the query

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: post,
                user: req.user,
            });

            post.comments.push(comment);
            await post.save();

            // commentMailer.newCommment(comment);
            // send the mail to user every time post get commented

            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log('error in sending in the queue', err)
                    return;
                }

                console.log('job enqueued', job.id);

            });
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

        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}