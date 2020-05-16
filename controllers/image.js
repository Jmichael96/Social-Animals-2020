const Image = require('../models/testImage');
const extractFile = require('../middleware/profileImgFile');

exports.upload = (req, res, next) => {

    const url = req.protocol + '://' + req.get('host');
    console.log(req.file);
    const image = new Image({
        imagePath: url + '/images/profilePicture/' + req.file.filename
    });
    image.save()
    .then((createdImg) => {
        res.status(201).json({
            message: 'Created image',
            createdImg
        })
    })
    .catch((error) => {
        console.log(error);
        throw error;
    });
}
