const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    imagePath: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorUsername: {
        type: String,
        ref: 'User',
        required: true
    },
    likes: [
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
            type: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    postType: {
        type: String,
        required: true
    },
    animalType: {
        type: String
    },
    hashtags: [
        {

            hashtag: {
                type: String
            }

        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Post', postSchema);