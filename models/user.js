const mongoose = require('mongoose');
const userSchema =  mongoose.Schema({
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
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;