const { info } = require('node-sass');
const nodemailer = require('../../config/nodemailer');
const User = require('../../models/user');

exports.newCommment = async (comment) => {

    let postUser = await User.findById(comment.post.user).exec();

    let htmlString = nodemailer.renderTemplate({ comment: comment, postUser: postUser }, '/comment/newComment.ejs');
    nodemailer.transporter.sendMail({
        from: 'vartaChat54@gmail.com',
        to: postUser.email,
        subject: " New Comment Published",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("there is an error in sending the email", err
            );
            return;
        }


        return;
    });
}   