
const { info } = require('node-sass');
const nodemailer = require('../../config/nodemailer');
const User = require('../../models/user');
const crypto = require('crypto');


module.exports.initiatePasswordReset = async function (req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Email adress is not found');
        }

        const resetToken = crypto.randomBytes(20).toString('hex')
        const TokenExpires = new Date();
        TokenExpires.setHours(TokenExpires.getHours() + 1);

        user.resetPasswordToken = resetToken;
        user.resetTokenExpires = TokenExpires;

        await user.save();

        const resetUrl = `http://localhost:8000/users/reset-password?token=${resetToken}`;


        const emailData = {
            from: 'vartaChat54@gmail.com',
            to: email,
            subject: "Reset Password",
            html: nodemailer.renderTemplate({ url: resetUrl }, '/Password/reset_password.ejs')
        }
        await nodemailer.transporter.sendMail(emailData);
        return res.render('passwordResetEmailSent', {
            title: 'Password Reset Email Sent'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}