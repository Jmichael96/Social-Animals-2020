const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    email: {
        type: String
    },
    followers: [
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
            }
        }
    ],
    following: [
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
            }
        }
    ],
    messages: [
        {
            createdId: {
                type: String,
                required: true
            },
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
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ],
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
