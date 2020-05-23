const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../services/keys');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
exports.register = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            username: req.body.username,
            password: hash,
            profilePicture: url + '/images/profilePicture/default.jpeg',
            name: req.body.name,
            bio: req.body.bio,
            location: req.body.location,
            email: req.body.email
        });
        user.save()
            .then((user) => {
                const payload = {
                    user: {
                        _id: user._id,
                        username: user.username,
                        profilePicture: user.profilePicture,
                        name: user.name,
                        bio: user.bio,
                        location: user.bio,
                        email: user.email
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
                console.log(err)
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
            if (!user) {
                console.log('No user to load')
                return;
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Load user server error'
            });
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
                    _id: fetchedUser._id,
                    username: fetchedUser.username,
                    profilePicture: fetchedUser.profilePicture,
                    name: fetchedUser.name,
                    bio: fetchedUser.bio,
                    location: fetchedUser.bio,
                    email: fetchedUser.email
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