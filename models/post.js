const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    imagePath: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Post', postSchema);