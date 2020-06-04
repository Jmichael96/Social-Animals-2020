const Chat = require('../models/chat');
const User = require('../models/user');

exports.join = (io, room, userObj) => {

    // const chat = new Chat({
    //     room: room,
    //     users: userObj
    // });
    // chat.save().then((chat) => {
    //     console.log(chat);
    //     io.emit('chat-created', { room: chat.room, users: chat.users, userMessages: chat.userMessages });
    // })
    //     .catch((err) => {
    //         console.log(err);
    //         throw err;
    //     })
};

exports.sendMessage = (roomId, userId1, userId2, messageUserId, username, message) => {

    User.findById({ _id: userId1 })
    .then((user) => {
        let messages = user.messages;
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].createdId.toString() === roomId) {
                messages[i].userMessages.push({ userId: messageUserId, username: username, message: message });
            }
        }
        user.save();
    })

    User.findById({ _id: userId2 })
    .then((user) => {
        let messages = user.messages;
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].createdId.toString() === roomId) {
                messages[i].userMessages.push({ userId: messageUserId, username: username, message: message });
            }
        }
        user.save()
    })
};

// fetching data inside room
exports.fetchRoom = (io, userId, roomId) => {
    User.findOne({ _id: userId})
    .then((user) => {
        let messages = user.messages;

        for (let i = 0; i < messages.length; i++) {
            if (messages[i].createdId.toString() === roomId) {
                io.emit('fetch-room-data', { roomId: messages[i].createdId, room: messages[i].room, users: messages[i].users, userMessages: messages[i].userMessages })
            }
        }
    })
}
