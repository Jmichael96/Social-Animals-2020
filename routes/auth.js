const router = require('express').Router();
const AuthController = require('../controllers/auth');
const isAuthenticated = require('../middleware/check-auth');


// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', AuthController.register);

// @route    GET api/auth/load_user
// @desc     Load user
// @access   Public
router.get('/load_user', isAuthenticated, AuthController.loadUser);

// @route    POST api/auth/login
// @desc     login user
// @access   Public
router.post('/login', AuthController.login);

module.exports = router;