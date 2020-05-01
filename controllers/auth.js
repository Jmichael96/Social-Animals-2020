const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../services/keys');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: '../images/profilePicture/',
//     filename: function (req, res, cb) {
//         cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1000000
//     },
// }).single('myImage');
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
exports.register = (req, res, next) => {
    console.log('register api fired')
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            username: req.body.username,
            password: hash
        });
        user.save()
            .then((user) => {
                const payload = {
                    user: {
                        _id: user._id
                    }
                }
                jwt.sign(payload, config.SECRET,
                    { expiresIn: 3600 }, (err, token) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        res.json({ token });
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Invalid authentication credentials!'
                });
            })
    });
}

// @route    GET api/auth/load_user
// @desc     Load user
// @access   Public
exports.loadUser = (req, res, next) => {
    User.findById(req.user._id).select('-password')
        .then((user) => {
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Load user server error'
            });
            console.log(err);
            throw err;
        })
}


// @route    GET api/auth/login
// @desc     login user
// @access   Public
exports.login = (req, res, next) => {
    let fetchedUser;
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid username or password'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: 'Invalid username or password'
                });
            }

            const payload = {
                user: {
                    _id: fetchedUser._id
                }
            }

            jwt.sign(payload, config.SECRET,
                { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    res.json({ token });
                });
        });

}