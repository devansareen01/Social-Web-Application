const mongoose = require('mongoose');
const userSchema = mongoose.schema({
    email: {
        type: String,
        requrired: true,
        unique: true
    },
    password: {
        type: String,
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