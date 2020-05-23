const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../services/keys');

// @route    GET api/user/usernames
// @desc     Fetch all usernames
// @access   Private
exports.fetchUsernames = (req, res, next) => {
    User.find()
        .then((users) => {
            let usernameArr = [];
            users.filter((i) => {
                usernameArr.push({ _id: i._id, username: i.username });
            });
            res.status(201).json(usernameArr);
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Error finding users!'
            });
        })
}

// @route    PUT api/user/update_profile_pic/:id
// @desc     Update a profile picture
// @access   Private
exports.updateProfilePicture = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    User.findByIdAndUpdate({ _id: req.params.id }, {
        profilePicture: url + '/images/profilePicture' + req.file.filename
    }).then((user) => {
        res.status(201).json(user);
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Error updating user!'
            });
        })
}

// @route    PUT api/user/update_profile/:id
// @desc     Update a profile
// @access   Private
exports.updateProfile = (req, res, next) => {
    console.log('firing update profile api')
    const url = req.protocol + '://' + req.get('host');
    let path;
    if (req.file) {
        path = url + '/images/profilePicture/' + req.file.filename
    } else if (!req.file) {
        path = req.user.profilePicture
    }

     const profileFields = {
        profilePicture: path,
        name: req.body.name,
        bio: req.body.bio,
        location: req.body.location,
        email: req.body.email
    }
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true, upsert: true }
    ).then((user) => {
        console.log(user);
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
        res.status(201).json(user);
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Creating profile has failed!'
            });
        });
    // const updatedProfile = {}
    // if (!req.file) {
    //     updatedProfile = {
    //         profilePicture: req.user.profilePicture,
    //         name: req.body.name,
    //         bio: req.body.bio,
    //         location: req.body.location,
    //         email: req.body.email
    //     }
    // }
    // updatedProfile = {
    //     profilePicture: url + '/images/profilePicture' + req.file.filename,
    //     name: req.body.name,
    //     bio: req.body.bio,
    //     location: req.body.location,
    //     email: req.body.email
    // }

    // User.findByIdAndUpdate({ _id: req.params.id }, {
    //    updatedProfile
    // }).then((result) => {
    //     console.log(result)
    //     // res.status(201).json(user);
    // })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).json({
    //             serverMsg: 'Error updating user!'
    //         });
    //     })
}

// @route    GET api/user/user_profile/:id
// @desc     Get a use's profile by user Id
// @access   Private
exports.getUserProfile = (req, res, next) => {
    console.log('fetching user profile')
    User.findById({ _id: req.params.id })
        .then((user) => {
            res.status(201).json(user);
        }).catch((err) => {
            res.status(500).json({
                serverMsg: 'Error fetching user profile!'
            });
        })
    // User.findOne({
    //     user: req.params.id
    // }).populate('user', ['name'])
    //     .then((user) => {
    //         console.log(user);
    //         res.status(201).json(user);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).json({
    //             serverMsg: 'Fetching profile has failed!'
    //         });
    //     });
}

// @route    PUT api/user/follow/:id
// @desc     Follow a user profile
// @access   Private
exports.followUser = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id })
        .then((profile) => {
            if (profile.followers.some((follower) => follower.userId.toString() === req.user._id)) {
                res.status(400).json({
                    message: 'Profile has already been followed by this user'
                });
            };

            profile.followers.unshift({ userId: req.user._id, username: req.user.username });
            profile.save();
            res.status(201).json(profile.followers)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Following profile has failed!'
            });
        });
};

// @route    PUT api/user/unfollow/:id
// @desc     Unfollow a user profile
// @access   Private
exports.unfollowUser = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id })
        .then((profile) => {
            if (!profile.followers.some((follower) => follower.userId.toString() === req.user._id)) {
                return res.status(400).json({ msg: 'You have not followed this account yet' });
            }

            // remove follower
            profile.followers = profile.followers.filter(
                ({ userId }) => userId.toString() !== req.user._id
            );
            profile.save();
            res.status(201).json(profile.followers)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Unfollowing profile has failed!'
            });
        });
};
