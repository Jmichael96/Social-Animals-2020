const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notifiedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    notificationType: {
        type: String
    },
    profilePic: {
        type: String
    },
    link: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Notification', notificationSchema);