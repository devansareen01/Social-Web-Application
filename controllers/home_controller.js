const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })


        let users = await User.find({});

        return res.render('home', {
            title: "VARTACHAT | HOME",
            posts: posts,
            all_users: users
        });
    } catch (error) {
        console.log("error", error);
        return;
    }
}
