const router = require('express').Router();
const UserController = require('../controllers/user');
const isAuthenticated = require('../middleware/check-auth');

// @route    Post api/user/search_username
// @desc     Find a user by username
// @access   Private
// CURRENTLY N/A
router.post('/search_username', isAuthenticated, UserController.findUsername);

// @route    GET api/user/usernames
// @desc     Fetch all usernames
// @access   Private
router.get('/usernames', isAuthenticated, UserController.fetchUsernames);

module.exports = router;