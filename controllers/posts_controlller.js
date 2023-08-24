const Post = require('../models/posts');
module.exports.create = async function(req, res) {
    try {
        Post.create({
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
