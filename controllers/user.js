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

// // @route    POST api/user/set_chat/:id
// // @desc     Set up chat and get both the usersId for creating a room
// // @access   Private
// exports.setChat = (req, res, next) => {
//     let io = req.io;

//     // console.log('fired')
//     User.findById({ _id: req.params.id })
//         .then((user) => {

//             io.on('connect', (socket) => {
//                 const users = [];
//                 socket.on('join', ({ name, room }, callback) => {
//                     const { error, user } = addUser({ id: socket.id, name, room });

//                     if(error) return callback(error);

//                     socket.join(user.room);

//                     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//                     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//                     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//                     callback();
//                   });            
//             }) 
//             console.log(user)
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 serverMsg: 'Setting up chat has failed. Please try again later'
//             });
//         });
// }

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