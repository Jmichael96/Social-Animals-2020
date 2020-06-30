const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../services/keys');
const Chat = require('../models/chat');

// @route    GET api/user/usernames
// @desc     Fetch all usernames
// @access   Private
exports.fetchUsernames = (req, res, next) => {
    User.find()
        .then((users) => {
            let usernameArr = [];
            users.filter((i) => {
                usernameArr.push({ _id: i._id, username: i.username });
            });
            return res.status(201).json(usernameArr);
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'Error finding users!'
            });
        })
}

// @route    PUT api/user/update_profile/:id
// @desc     Update a profile
// @access   Private
exports.updateProfile = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    let path;
    //  setting the profile picture image accordingly if there is or isnt a file submitted
    if (req.file) {
        path = url + '/images/profilePicture/' + req.file.filename
    } else if (!req.file) {
        path = req.user.profilePicture
    }

    const profileFields = {
        profilePicture: path,
        name: req.body.name,
        bio: req.body.bio,
        location: req.body.location,
        email: req.body.email
    }
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true, upsert: true }
    ).then((user) => {
        // setting the jwt to assign the new values to the user in server
        const payload = {
            user: {
                _id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
                name: user.name,
                bio: user.bio,
                location: user.bio,
                email: user.email
            }
        }

        jwt.sign(payload, config.SECRET,
            { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.json({ token });
            });
        res.status(201).json({
            serverMsg: 'Successfully updated your profile',
            user
        });
    })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'Creating profile has failed. Please try again later'
            });
        });
}

// @route    GET api/user/user_profile/:id
// @desc     Get a user's profile by user Id
// @access   Private
exports.getUserProfile = (req, res, next) => {
    User.findById({ _id: req.params.id })
        .then((user) => {
            res.status(201).json(user);
        }).catch((err) => {
            res.status(500).json({
                serverMsg: 'Error fetching user profile. Please try again later'
            });
        })
}

// @route    PUT api/user/follow/:id
// @desc     Follow a user profile
// @access   Private
exports.followUser = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id })
        .then((user) => {

            // adding to followers array
            user.followers.unshift({ userId: req.user._id, username: req.user.username });

            user.save();
            return res.status(201).json({
                serverMsg: 'You have followed this user',
                user
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                serverMsg: 'Following profile has failed. Please try again later.'
            });
        });
};

// @route    PUT api/user/unfollow/:id
// @desc     Unfollow a user profile
// @access   Private
exports.unfollowUser = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id })
        .then((user) => {
            // if (!user.followers.some((follower) => follower.userId.toString() === req.user._id)) {
            //     res.status(400).json({ serverMsg: 'You have not followed this account yet.' });
            // }

            // remove follower
            user.followers = user.followers.filter(
                ({ userId }) => userId.toString() !== req.user._id
            );

            user.save();
            res.status(201).json({
                serverMsg: 'You have unfollowed this user',
                user
            })
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Unfollowing profile has failed. Please try again later'
            });
        });
};

// @route    PUT api/user/set_following/:userId/:username
// @desc     Set the following array of the authenticated user
// @access   Private
exports.setFollowing = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.user._id })
        .then((user) => {
            // if (user.following.some((follower) => follower.userId.toString() === req.params.userId)) {
            //     return res.status(400).json({
            //         serverMsg: 'Profile has already been following this user'
            //     });
            // };
            // adding to followers array
            user.following.unshift({ userId: req.params.userId, username: req.params.username });
            user.save();
            return res.status(201).json({
                serverMsg: 'You are following this user',
                user
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'Setting following profile has failed. Please try again later.'
            });
        });
}

// @route    PUT api/user/unset_following/:userId
// @desc     Unset the following array of the authenticated user
// @access   Private
exports.unsetFollowing = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.user._id })
        .then((user) => {
            // if (!user.following.some((follower) => follower.userId.toString() === req.params.userId)) {
            //     return res.status(400).json({ serverMsg: 'You haven\'t been following this account yet' });
            // }

            // remove follower
            user.following = user.following.filter(
                ({ userId }) => userId.toString() !== req.params.userId
            );

            user.save();
            return res.status(201).json({
                serverMsg: 'You are no longer following this user',
                user
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'Unsetting following profile has failed. Please try again later.'
            });
        });
}

// @route    GET api/user/fetch_messages
// @desc     Fetch all messages the auth user is involved in
// @access   Private
exports.fetchMessages = (req, res, next) => {
    Chat.find().then((chat) => {
        let usersChatsArr = [];
        for (let i = 0; i < chat.length; i++) {
            let users = chat[i].users;
            for (let j = 0; j < users.length; j++) {
                if (users[j].userId.toString() === req.user._id) {
                    usersChatsArr.push(chat[i]);
                }
            }
        }
        console.log('=========')
        console.log(usersChatsArr);
        res.status(201).json({
            messages: usersChatsArr
        })
    })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was an error fetching your messages. Please try again later.'
            });
        });
}

// @route    PUT api/user/create_room/:userId1/:userId2
// @desc     Creating a chat room
// @access   Private
exports.createRoom = (req, res, next) => {

    User.findById({ _id: req.params.userId2 })
        .then((user) => {
            console.log('id== ', req.body.roomId)
            const newMessage = {
                createdId: req.body.roomId,
                room: req.body.room,
                users: req.body.userObj,
            }
            user.messages.unshift(newMessage);
            user.save();
            console.log('=== new room ===');
            console.log(user.messages);
        })

    User.findById({ _id: req.params.userId1 })
        .then((user) => {
            const newMessage = {
                createdId: req.body.roomId,
                room: req.body.room,
                users: req.body.userObj,
            }
            user.messages.unshift(newMessage);
            user.save();
            console.log('=== new room ===');
            console.log(user.messages);
            res.status(201).json({
                user: user,
                serverMsg: 'You have successfully created a new message.'
            })
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was an error while creating your message. Please try again later.'
            });
        });
}

// @route    PUT api/user/delete_chat/:userId/:chatId
// @desc     Delete a chat room
// @access   Private
exports.deleteChat = (req, res, next) => {
    User.findById({ _id: req.params.userId })
    .then((user) => {
       
        const message = user.messages.find((message) => 
            message.id === req.params.chatId
        )

        if (!message) {
            return res.status(404).json({
                serverMsg: 'Message does not exist'
            });
        }

        user.messages = user.messages.filter(
            ({ id }) => id !== req.params.chatId
        )

        user.save()

        return res.status(201).json({
            user: user,
            serverMsg: 'Message successfully deleted'
        });
    })
    .catch((err) => {
        return res.status(500).json({
            serverMsg: 'Deleting this message has failed. Please try again later.'
        });
    });
}

// @route    PUT api/user/notify/:id
// @desc     Adding a notification for the specified user
// @access   Private
exports.notify = (req, res, next) => {
    User.findById({ _id: req.params.id })
    .then((user) => {
        let newNotification = {}
        if (!req.body.roomId) {
            newNotification = {
                notifiedUser: req.body.notifiedUser,
                userId: req.body.userId,
                username: req.body.username,
                notificationType: req.body.notificationType
            }
        } else if (req.body.roomId) {
            newNotification = {
                notifiedUser: req.body.notifiedUser,
                userId: req.body.userId,
                username: req.body.username,
                roomId: req.body.roomId,
                notificationType: req.body.notificationType,
            }
        }
        user.notifications.unshift(newNotification);
        user.save();
        console.log(user)
        res.status(201);
    })
    .catch((err) => {
        return res.status(500).json({
            serverMsg: 'Error sending notification'
        });
    });
}

// @route    PUT api/user/follow_hashtag
// @desc     Follow a specific hashtag 
// @access   Private
exports.followHashtag = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.user._id }) 
    .then((user) => {

        // adding the specified hashtag to the followedHashtags array
        user.followedHashtags.unshift({ hashtag: req.body.hashtag });
        
        user.save();

        res.status(201).json({
            serverMsg: 'Successfully followed this tag',
            user: user
        })
    })
    .catch((err) => {
        return res.status(500).json({
            serverMsg: 'Error following hashtag'
        });
    });
}

// @route    PUT api/user/unfollow_hashtag
// @desc     Unfollow a hashtag
// @access   Private
exports.unfollowHashtag = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.user._id }) 
    .then((user) => {
        if (user.followedHashtags.length >= 1) {
            // assigning the hashtag array of objects to 'arr' variable
            let arr = user.followedHashtags;
            // getting the index of the hashtag thats being deleted
            let index = arr.map((x) => { return x.hashtag }).indexOf(req.body.hashtag);
            // splicing and removing the hashtag in the array
            arr.splice(index, 1);
        }        
        
        user.save();
        res.status(201).json({
            serverMsg: `Unfollowed the hashtag '${req.body.hashtag}'`,
            user: user
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            serverMsg: 'Error unfollowing hashtag'
        });
    });
}