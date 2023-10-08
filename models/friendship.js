const mongoose = require('mongoose');

const freindShipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const FriendShip = mongoose.model('Friendship', freindShipSchema);
module.exports = FriendShip;