const router = require('express').Router();
const ProfileController = require('../controllers/profile');
const isAuthenticated = require('../middleware/check-auth');

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

module.exports = router;
