const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    try {
        let posts = await Post.find({})
            .populate('user') // Populate the 'user' field of each post
            .populate({
                path: 'comments',

                populate: {
                    path: 'user' // Populate the 'user' field of each comment
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes');

        console.log(posts);

        let users = await User.find({});

        return res.render('home', {
            title: "VARTACHAT | HOME",
            posts: posts,
            all_users: users,

        });

    } catch (error) {
        console.log("error", error);
        return;
    }
}