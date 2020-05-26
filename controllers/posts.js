const Post = require('../models/post');

// @route    POST api/posts/create_post
// @desc     Creating post
// @access   Private
exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');

    if (!req.files) {
        res.status(400).json({
            message: 'You must add a photo to create a post'
        });
    }

    const post = new Post({
        content: req.body.content,
        authorId: req.user._id,
        authorUsername: req.user.username
    });
    post.save()
        .then((createdPost) => {
            let fileArr = req.files;
            if (fileArr.length === 1) {
                for (let i = 0; i < fileArr.length; i++) {
                    createdPost.imagePath.push({ url: url + '/images/postPicture/' + fileArr[i].filename })
                }
            }
            else if (fileArr.length > 1) {
                for (let i = 0; i < fileArr.length; i++) {
                    createdPost.imagePath.push({ url: url + '/images/postPicture/' + fileArr[i].filename })
                }
            }
            createdPost.save();

            res.status(201).json({
                createdPost,
                serverMsg: 'Created post successfully'
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Creating post has failed. Please try again later'
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
                    serverMsg: 'No posts available'
                })
            }
            res.status(201).json(posts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Could not receive posts'
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
                res.status(200).json({ serverMsg: 'Updated post successfully' });
            } else {
                res.status(401).json({ serverMsg: 'You are not authorized' });
            };
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Could not update post at this time. Please try again later.'
            });
        });
};


// @route    DELETE api/posts/delete_post/:id
// @desc     Delete post
// @access   Private
exports.deletePost = (req, res, next) => {
    Post.findByIdAndDelete({ _id: req.params.id, authorId: req.user._id })
        .then((result) => {

            return res.status(200).json({
                serverMsg: 'Successfully delete post',
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'Couldn\'t delete post. Please try again later.'
            });
        });
}

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
exports.likePost = (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
            if (post.likes.some((like) => like.userId.toString() === req.user._id)) {
                return res.status(400).json({
                    serverMsg: 'Post has already been liked by this user'
                });
            };

            post.likes.unshift({ userId: req.user._id, username: req.user.username });
            console.log(post)
            post.save()
            return res.json(post.likes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: "Couldn't like post. Please try again later."
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
                return res.status(400).json({ serverMsg: 'Post has not yet been liked' });
            }

            // remove like
            post.likes = post.likes.filter(
                ({ userId }) => userId.toString() !== req.user._id
            );
            post.save();
            return res.json(post.likes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: "Couldn't unlike post. Please try again later"
            });
        });
}

// @route    GET api/posts/fetch_likes/:id
// @desc     fetch the likes of a post
// @access   Private
exports.fetchLikes = (req, res, next) => {
    Post.findById({ _id: req.params.id })
        .then((post) => {
            return res.status(200).json(post.likes);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: "Couldn't retrieve likes. Please try again later"
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
            res.json({
                comments: post.comments,
                serverMsg: 'Successfully made a comment'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: "Couldn't comment on post. Please try again later"
            });
        });
}

// @route    DELETE api/posts/delete_comment/:postId/:comment_id
// @desc     Delete a comment
// @access   Private
exports.deleteCommment = (req, res, next) => {
    Post.findById({ _id: req.params.postId })
        .then((post) => {
            const comment = post.comments.find((comment) =>
                comment.id === req.params.comment_id
            )
            if (!comment) {
                return res.status(404).json({
                    serverMsg: 'Comment does not exist'
                });
            }

            if (post.authorId.toString() === req.user._id) {
                console.log('deleted by post author')
                post.comments = post.comments.filter(
                    ({ id }) => id !== req.params.comment_id
                );
            }
            else if (comment.userId.toString() === req.user._id) {
                console.log('deleted by comment author')
                post.comments = post.comments.filter(
                    ({ id }) => id !== req.params.comment_id
                );
            }

            post.save();

            return res.json({
                comments: post.comments,
                serverMsg: 'Successfully deleted comment'
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'Couldn\'t delete post. Please try again later.'
            });
        });
};

// @route    PUT api/posts/update_comment/:id
// @desc     Update a comment
// @access   Private
exports.updateComment = (req, res, next) => {
    Post.updateOne({ 'comments._id': req.params.id },
        {
            $set: {
                'comments.$.userId': req.user._id,
                'comments.$.name': req.user.username,
                'comments.$.text': req.body.text
            }
        })
        .then((result) => {
            if (result.n > 0) {
                return res.status(200).json({ serverMsg: 'Updated comment successfully' });
            } else {
                return res.status(401).json({ serverMsg: 'Not authorized' });
            };
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'Couldn\'t update post. Please try again later.'
            });
        });
};

// @route    GET api/posts/fetch_following_posts
// @desc     Fetch only the posts from the users you are following
// @access   Private
exports.fetchFollowingPosts = (req, res, next) => {

    // checking if there is an array of userId's to search for in posts
    // if not return a serverMsg
    if (req.query.userIdArr.length <= 0) {
        return res.status(401).json({
            serverMsg: 'You are not following anyone. Please follow someone to view the posts.'
        });
    }

    Post.find({ authorId: { $in: req.query.userIdArr } }).sort({ _id: -1 })
        .then((posts) => {
            res.status(201).json(posts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Couldn\'t fetch posts at this time.'
            });
        })
}