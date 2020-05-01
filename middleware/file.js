const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, '/images/profilePicture');
  },
  filename: (req, file, cb) => {
    //   console.log(req.body);
    const name = file.originalname.toLowerCase().split(' ').join('-');
    // console.log(name + ' filename');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
module.exports = multer({ storage: storage }).single('image');