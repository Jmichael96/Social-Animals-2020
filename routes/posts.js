const router = require('express').Router();
const PostController = require('../controllers/posts');
const isAuthenticated = require('../middleware/check-auth');
const checkObjectId = require('../middleware/checkObjectId');
const extractPostFile = require('../middleware/postImgFile');

// @route    POST api/posts/create_post
// @desc     Creating post
// @access   Private
router.post('/create_post', isAuthenticated, extractPostFile, PostController.createPost);

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
router.put('/delete_comment/:postId/:comment_id', isAuthenticated, PostController.deleteCommment);

// @route    PUT api/posts/update_comment/:id
// @desc     Update a comment
// @access   Private
router.put('/update_comment/:id', [isAuthenticated, checkObjectId('id')], PostController.updateComment);

// @route    GET api/posts/fetch_likes/:id
// @desc     fetch the likes of a post
// @access   Private
router.get('/fetch_likes/:id', isAuthenticated, PostController.fetchLikes);

// @route    PUT api/posts/fetch_following_posts
// @desc     Fetch only the posts from the users you are following
// @access   Private
router.get('/fetch_following_posts', isAuthenticated, PostController.fetchFollowingPosts);

// @route    GET api/posts/fetch_my_posts
// @desc     Fetch posts that were created by the current authenticated user
// @access   Private
router.get('/fetch_my_posts', isAuthenticated, PostController.fetchMyPosts);

// @route    GET api/posts/fetch_user_profile_posts
// @desc     Fetch posts that belong to the users profile you are viewing
// @access   Private
router.get('/fetch_user_profile_posts', isAuthenticated, PostController.fetchUsersProfilePosts);

module.exports = router;