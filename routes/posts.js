const router = require('express').Router();
const PostController = require('../controllers/posts');
const isAuthenticated = require('../middleware/check-auth');


// @route    POST api/posts/create_post
// @desc     Creating post
// @access   Private
router.post('/create_post', isAuthenticated, PostController.createPost);

// @route    GET api/posts/fetch_all
// @desc     Fetching all posts
// @access   Public
router.get('/fetch_all', PostController.fetchAll);

module.exports = router;