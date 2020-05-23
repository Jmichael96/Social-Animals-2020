const router = require('express').Router();
const ProfileController = require('../controllers/profile');
const isAuthenticated = require('../middleware/check-auth');
const extractProfileImgFile = require('../middleware/profileImgFile');

// @route    GET api/profile/me
// @desc     Fetching personal profile
// @access   Private
router.get('/me', isAuthenticated, ProfileController.getPersonalProfile);

// @route    POST api/profile/create_profile
// @desc     Creating a profile
// @access   Private
router.post('/create_profile', isAuthenticated, ProfileController.createProfile);


// @route    GET api/profile/user_profile/:id
// @desc     Get a profile by user Id
// @access   Private
router.get('/user_profile/:id', isAuthenticated, ProfileController.getProfile);

// @route    PUT api/profile/follow/:id
// @desc     Follow a user profile
// @access   Private
router.put('/follow/:id', isAuthenticated, ProfileController.follow);

// @route    PUT api/profile/unfollow/:id
// @desc     Unfollow a user profile
// @access   Private
router.put('/unfollow/:id', isAuthenticated, ProfileController.unfollow);

module.exports = router;
