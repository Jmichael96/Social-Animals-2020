const router = require('express').Router();
const AuthController = require('../controllers/auth');
const extractFile = require('../middleware/file');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', extractFile, AuthController.register);

module.exports = router;