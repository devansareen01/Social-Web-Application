const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join('/upload/users/avatar');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        requrired: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.Mixed,
        requrired: true
    },
    name: {
        type: String,
        requrired: true
    },
    avatar: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetTokenExpires: {
        type: Date
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, path.join(__dirname, '..', AVATAR_PATH));

    },
    filename: function (req, file, callBack) {
        callBack(null, file.fieldname + '-' + Date.now());

    }

});

// static fucntions
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');

userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User', userSchema);

module.exports = User;