const User = require('../models/user');

exports.sendMessage = (io, roomId, userId1, userId2, messageUserId, username, message) => {

    User.findById({ _id: userId1 })
        .then((user) => {
            let messages = user.messages;
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    messages[i].userMessages.push({ userId: messageUserId, username: username, message: message });
                    console.log('updated for user 1')
                }
                user.save();
                io.emit('fetched-new-messages', { userMessages: messages[i].userMessages });
            }
        })

    User.findById({ _id: userId2 })
        .then((user) => {
            let messages = user.messages;
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    messages[i].userMessages.push({ userId: messageUserId, username: username, message: message });
                    console.log('updated for user 2');
                }
                user.save()
            }
        })
};

// fetching data inside room
exports.fetchRoom = (io, userId, roomId) => {
    User.findOne({ _id: userId })
        .then((user) => {
            if (user.messages.length <= 0) {
                io.emit('fetch-room-data')
                return;
            }
            let messages = user.messages;

            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    io.emit('fetch-room-data', { roomId: messages[i].createdId, room: messages[i].room, users: messages[i].users, userMessages: messages[i].userMessages })
                }

            }
        })
}

// delete a message 
exports.deleteMessage = (io, userId1, userId2, roomId, msgId) => {

    User.findOne({ _id: userId1 })
        .then((user) => {
            if (user.messages.length <= 0) {
                return;
            }

            let messages = user.messages;

            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    messages[i].userMessages = messages[i].userMessages.filter(
                        ({ id }) => id !== msgId
                    );
                }
                user.save();
                io.emit('fetched-deleted-messages', { userMessages: messages[i].userMessages });
            }
        })

    User.findOne({ _id: userId2 })
        .then((user) => {
            if (user.messages.length <= 0) {
                return;
            }

            let messages = user.messages;

            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    messages[i].userMessages = messages[i].userMessages.filter(
                        ({ id }) => id !== msgId
                    );
                }
                user.save();
            }
        })
}