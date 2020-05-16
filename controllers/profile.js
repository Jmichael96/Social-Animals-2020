const Profile = require('../models/profile');

// @route    GET api/profile/me
// @desc     Fetching personal profile
// @access   Private
exports.getPersonalProfile = (req, res, next) => {
    Profile.findOne({
        user: req.user._id
    })
        .then((profile) => {
            res.json(profile);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Fetching profile error'
            });
        });
};

// @route    POST api/profile/create_profile
// @desc     Creating a profile
// @access   Private
exports.createProfile = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const { name, bio, location, email } = req.body;

    const profileFields = {
        user: req.user._id,
        profilePicture: url + '/images/profilePicture/' + req.file.filename,
        name,
        bio,
        location,
        email
    }
    Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true, upsert: true }
    ).then((createdProfile) => {
        console.log(createdProfile);
        res.status(201).json(createdProfile);
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Creating profile has failed!'
            });
        });
};


// @route    GET api/profile/user_profile/:id
// @desc     Get a profile by user Id
// @access   Private
exports.getProfile = (req, res, next) => {
    Profile.findOne({
        user: req.params.id
    }).populate('user', ['name'])
        .then((profile) => {
            res.status(201).json(profile);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Fetching profile has failed!'
            });
        });
}


// @route    PUT api/profile/follow/:id
// @desc     Follow a user profile
// @access   Private
exports.follow = (req, res, next) => {
    Profile.findByIdAndUpdate({ _id: req.params.id })
        .then((profile) => {
            if (profile.followers.some((follower) => follower.userId.toString() === req.user._id)) {
                res.status(400).json({
                    message: 'Profile has already been followed by this user'
                });
            };

            profile.followers.unshift({ userId: req.user._id, username: req.user.username });
            profile.save();
            console.log(profile.followers);
            res.status(201).json(profile.followers)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Following profile has failed!'
            });
        });
};

// @route    PUT api/profile/unfollow/:id
// @desc     Unfollow a user profile
// @access   Private
exports.unfollow = (req, res, next) => {
    Profile.findByIdAndUpdate({ _id: req.params.id })
        .then((profile) => {
            if (!profile.followers.some((follower) => follower.userId.toString() === req.user._id)) {
                return res.status(400).json({ msg: 'You have not followed this account yet' });
            }

            // remove follower
            profile.followers = profile.followers.filter(
                ({ userId }) => userId.toString() !== req.user._id
            );
            profile.save();
            console.log(profile);
            res.status(201).json(profile.followers)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Unfollowing profile has failed!'
            });
        });
};

// TESTING THIS FIRST BEFORE USING!!!
// @route    DELETE api/profile/remove_profile
// @desc     Remove current user profile
// @access   Private
// exports.removeProfile = (req, res, next) => {
//     Post
// }