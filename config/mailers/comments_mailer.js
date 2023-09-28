const { info } = require('node-sass');
const nodemailer = require('../../config/nodemailer');

exports.newCommment = (comment) => {
    console.log("inside node mailer");
    console.log(comment.user);
    nodemailer.transporter.sendMail({
        from: 'vartaChat54@gmail.com',
        to: comment.user.email,
        subject: " New Comment Published",
        html: '<h1> Yup your commment is published !</h1>'
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