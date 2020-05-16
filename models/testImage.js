const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imagePath: {
        type: String
    }
});

module.exports = mongoose.model('Image', imageSchema);