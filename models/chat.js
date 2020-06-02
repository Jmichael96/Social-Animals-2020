const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    room: {
        type: String
    },
    users: [
        {
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
        }
    ],
    userMessages: [
        {
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
            message: {
                type: String
            }
        }
    ],
});

module.exports = mongoose.model('Chat', chatSchema);