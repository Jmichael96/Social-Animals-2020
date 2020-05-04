const Post = require('../models/post');

// @route    POST api/posts/create_post
// @desc     Creating post
// @access   Private
exports.createPost = (req, res, next) => {
    console.log(req.user._id + ' user id');
    console.log(req.user.username + ' user username');
    const post = new Post({
        content: req.body.content,
        imagePath: req.body.imagePath,
        authorId: req.user._id,
        authorUsername: req.user.username
    });

    post.save()
    .then((createdPost) => {
        console.log(createdPost);
        res.status(201).json(createdPost)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Creating post has failed!'
        })
    })
}

// @route    GET api/posts/fetch_all
// @desc     Fetching all posts
// @access   Public
exports.fetchAll = (req, res,next) => {

    Post.find().sort({ date: -1 })
    .then((posts) => {
        if (!posts) {
            res.status(500).json({
                message: 'No posts available'
            })
        }
        res.status(201).json(posts);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Could not receive posts!'
        })
    })
}