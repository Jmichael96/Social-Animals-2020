const router = require('express').Router();
const PostController = require('../controllers/posts');
const isAuthenticated = require('../middleware/check-auth');
const checkObjectId = require('../middleware/checkObjectId');

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

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', [isAuthenticated, checkObjectId('id')], PostController.likePost);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', [isAuthenticated, checkObjectId('id')], PostController.unlikePost);

// @route    PUT api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post('/comment/:id', [isAuthenticated, checkObjectId('id')], PostController.comment);

// @route    DELETE api/posts/comment/:postId/:comment_id
// @desc     Delete a comment
// @access   Private
router.delete('/delete_comment/:postId/:comment_id', isAuthenticated, PostController.deleteCommment);

// @route    PUT api/posts/update_comment/:postId/:comment_id
// @desc     Update a comment
// @access   Private
router.put('/update_comment/:postId/comment_id', isAuthenticated, PostController.updateComment);

module.exports = router;