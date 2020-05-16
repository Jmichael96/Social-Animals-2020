const router = require('express').Router();
const extractFile = require('../middleware/profileImgFile');
const ImageController = require('../controllers/image');


router.post('/upload', extractFile, ImageController.upload)

module.exports = router;