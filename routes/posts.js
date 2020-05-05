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

// @route    PUT api/posts/update_post/:id
// @desc     Update post
// @access   Private
router.put('/update_post/:id', isAuthenticated, PostController.updatePost);


// @route    DELETE api/posts/delete_post/:id
// @desc     Delete post
// @access   Private
router.delete('/delete_post/:id', isAuthenticated, PostController.deletePost);

module.exports = router;