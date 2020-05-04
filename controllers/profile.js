const Profile = require('../models/profile');

// @route    GET api/profile/me
// @desc     Fetching personal profile
// @access   Private
exports.getPersonalProfile = (req, res, next) => {
    Profile.findOne({
        user: req.user._id
    })
        .then((profile) => {
            console.log(profile);
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
    const { name, bio, location, email } = req.body;
    const profileFields = {
        user: req.user._id,
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
        res.status(500).json({
            message: 'Creating profile has failed!'
        });
    });
};


// @route    GET api/profile/user_profile/:id
// @desc     Get a profile by user Id
// @access   Private
exports.getProfile = (req, res, next) => {
     // check if the id is a valid ObjectId
    //  if (!mongoose.Types.ObjectId.isValid(id)) {
    //      console.log('No user here!')
    //      res.status(400).json({
    //          message: 'Invalid user id'
    //      });

    //  }
     console.log('fired get profile!')
    Profile.findOne({
        user: req.params.id
    }).populate('user', ['name'])
    .then((profile) => {
        console.log('getProfile() ' + profile);
        res.status(201).json(profile);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Fetching profile has failed!'
        });
    });
}

// TESTING THIS FIRST BEFORE USING!!!
// @route    DELETE api/profile/remove_profile
// @desc     Remove current user profile
// @access   Private
// exports.removeProfile = (req, res, next) => {
//     Post
// }