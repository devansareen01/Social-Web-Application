const Post = require('../models/posts');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function (req, res) {
    try {
        await Post.uploadedMedia(req, res, async function (err) {

            if (err) {
                console.log("Error uploading media:", err);
                req.flash('error', 'Error uploading media.');
                return res.redirect('back');
            }
            let media = null;
            if (req.file) {
                media = Post.mediaPath + '/' + req.file.filename;
            }
            let post = await Post.create({
                content: req.body.content,
                user: req.user,
                media: media
            });

        })

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }
        req.flash('success', "Post Published!")
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

            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });
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


