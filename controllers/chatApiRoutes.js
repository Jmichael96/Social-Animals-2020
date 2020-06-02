// const Chat = require('../models/chat');

// // @route    GET api/chat/fetch_room
// // @desc     Fetching the room to get all room data
// // @access   Private
// exports.fetchRoom = (req, res, next) => {
//     Chat.findOne({ room: req.query.room })
//         .then((chat) => {
//             res.status(201).json({
//                 room: chat.room,
//                 users: chat.users,
//                 userMessages: chat.userMessages
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 serverMsg: 'Error fetching chat room data'
//             });
//         });
// }