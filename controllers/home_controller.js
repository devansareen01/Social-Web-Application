const Post = require('../models/posts');

module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .exec();
        return res.render('home', {
            title: "VARTACHAT | HOME",
            posts: posts
        });
    } catch (error) {
        console.log("error" , error);
        return;
    }
}
