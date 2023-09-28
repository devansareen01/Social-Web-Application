const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

    return res.json(200, {
        message: "List of Posts",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });
            return res.json(200, {
                message: "post deleted sucessfully"
            })
        } else {
            res.json(401, {
                message: "you cannot delete this post"
            })
        }

    } catch (error) {
        console.error(error);
        return res.json(500, {
            message: "Internal server error"
        });
    }
};