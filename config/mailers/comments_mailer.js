const { info } = require('node-sass');
const nodemailer = require('../../config/nodemailer');

exports.newCommment = (comment) => {
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comment/newComment.ejs');
    nodemailer.transporter.sendMail({
        from: 'vartaChat54@gmail.com',
        to: comment.user.email,
        subject: " New Comment Published",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("there is an error in sending the email", err
            );
            return;
        }

        console.log("mail delivered", info);
        return;
    });
}   