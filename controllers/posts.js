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
exports.fetchAll = (req, res, next) => {

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

// @route    PUT api/posts/update_post/:id
// @desc     Update post
// @access   Private
exports.updatePost = (req, res, next) => {

    Post.updateOne({ _id: req.params.id, authorId: req.user._id }, {
        content: req.body.content,
        imagePath: req.body.imagePath,
        authorId: req.user._id,
        authorUsername: req.user.username
    })
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({ message: 'Updated post successfully' });
            } else {
                res.status(401).json({ message: 'Not authorized' });
            };
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Couldn't udpate post!"
            });
        });
};


// @route    DELETE api/posts/delete_post/:id
// @desc     Delete post
// @access   Private
exports.deletePost = (req, res, next) => {
    Post.findByIdAndDelete({ _id: req.params.id, authorId: req.user._id })
        .then((result) => {
            res.status(200).json({
                message: 'Successfully delete post',
                result: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Couldn't delete post!"
            });
        });
}

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
exports.likePost = (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
            if (post.likes.some((like) => like.user.toString() === req.user._id)) {
                res.status(400).json({
                    message: 'Post has already been liked by this user'
                });
            };

            post.likes.unshift({ userId: req.user._id });
            console.log(post)
            post.save()
            return res.json(post.likes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Couldn't like post!"
            });
        });
}

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
exports.unlikePost = (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
            if (!post.likes.some((like) => like.userId.toString() === req.user._id)) {
                return res.status(400).json({ msg: 'Post has not yet been liked' });
            }

            // remove like
            post.likes = post.likes.filter(
                ({ userId }) => userId.toString() !== req.user._id
            );
            post.save();
            console.log(post)
            return res.json(post.likes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Couldn't unlike post!"
            });
        });
}

// @route    PUT api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
exports.comment = (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id })
    .then((post) => {
        const newComment = {
            userId: req.user._id,
            name: req.user.username,
            text: req.body.text
        }
        post.comments.unshift(newComment);
        post.save();
        console.log(post);
        res.json(post.comments);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Couldn't comment on post!"
        });
    });
}