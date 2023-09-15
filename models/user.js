const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join('/Upload/users/avatar');
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
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, path.join(__dirname, '..', AVATAR_PATH));

    },
    filename: function (req, file, callBack) {
        callBack(file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});

// static fucntions
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');

userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User', userSchema);

module.exports = User;