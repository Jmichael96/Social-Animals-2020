const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../services/keys');
const { check, validationResult } = require('express-validator');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
exports.register = [
    check('name', 'Name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a valid password with 6 or more characters').not().isEmpty().isLength({ min: 6 })
], 
(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    let checkUser = User.findOne({ username: req.body.username });
    if (checkUser) {
        res.status(400).json({
            message: 'Username already exists'
        });
    };

    const url = req.protocol + '://' + req.get('host');

    bcrypt.hash(req.body.password, 10) 
    .then((hash) => {
        const user = new User({
            name: req.body.name,
            bio: req.body.bio,
            profilePicture: url + '/images/profilePicture' + req.file.filename,
            username: req.body.username,
            password: hash
        });
        user.save()
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.SECRET,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            }
        );
        // .then((result) => {
        //     res.status(201).json({
        //         message: 'User registered',
        //         result: result
        //     });
        // })
        // .catch((err) => {
        //     res.status(500).json({
        //         message: 'Invalid authentication credentials'
        //     });
        // });
    })
    .catch((err) => {
        res.status(401).json({
            message: 'Register server error'
        });
    });
};


