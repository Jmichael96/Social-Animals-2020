const router = require('express').Router();
const UserController = require('../controllers/user');
const isAuthenticated = require('../middleware/check-auth');
const extractProfilePic = require('../middleware/profileImgFile');

// @route    GET api/user/usernames
// @desc     Fetch all usernames
// @access   Private
router.get('/usernames', isAuthenticated, UserController.fetchUsernames);

// @route    GET api/user/user_profile/:id
// @desc     Get a use's profile by user Id
// @access   Private
router.get('/user_profile/:id', isAuthenticated, UserController.getUserProfile);

// @route    PUT api/user/follow/:id
// @desc     Follow a user profile
// @access   Private
router.put('/follow/:id', isAuthenticated, UserController.followUser);

// @route    PUT api/user/unfollow/:id
// @desc     Unfollow a user profile
// @access   Private
router.put('/unfollow/:id', isAuthenticated, UserController.unfollowUser);

// @route    PUT api/user/update_profile/:id
// @desc     Update a profile
// @access   Private
router.put('/update_profile/:id', isAuthenticated, extractProfilePic, UserController.updateProfile);

// @route    PUT api/user/set_following/:userId/:username
// @desc     Set the following array of the authenticated user
// @access   Private
router.put('/set_following/:userId/:username', isAuthenticated, UserController.setFollowing);

// @route    PUT api/user/unset_following/:userId
// @desc     Unset the following array of the authenticated user
// @access   Private
router.put('/unset_following/:userId', isAuthenticated, UserController.unsetFollowing);

// @route    GET api/user/fetch_messages
// @desc     Fetch all messages the auth user is involved in
// @access   Private
router.get('/fetch_messages', isAuthenticated, UserController.fetchMessages);

module.exports = router;