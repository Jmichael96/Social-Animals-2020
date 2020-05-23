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
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
