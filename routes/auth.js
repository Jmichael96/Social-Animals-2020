const router = require('express').Router();
const AuthController = require('../controllers/auth');
// const extractFile = require('../middleware/file');
const isAuthenticated = require('../middleware/check-auth');
// const { check, validationResult } = require('express-validator');
// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const uuidv4 = require('uuidv4');
// const jwt = require('jsonwebtoken');
// const config = require('../services/keys');

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