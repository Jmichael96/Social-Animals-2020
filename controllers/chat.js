const User = require('../models/user');

// TESTING

exports.join = (io, name, room) => {

}



// TESTING
exports.sendMessage = async (io, roomId, userId1, userId2, messageUserId, username, message, messageId) => {
    try {
        const user1 = await User.findById({ _id: userId1 });
        const user2 = await User.findById({ _id: userId2 });

        let user1Msgs = user1.messages;
        let user2Msgs = user2.messages;
        let newMsgs;
        for (let i = 0; i < user1Msgs.length; i++) {
            if (user1Msgs[i].createdId.toString() === roomId) {
                user1Msgs[i].userMessages.push({ messageId: messageId, userId: messageUserId, username: username, message: message });
            }
        }
        for (let j = 0; j < user2Msgs.length; j++) {
            if (user2Msgs[j].createdId.toString() === roomId) {
                user2Msgs[j].userMessages.push({ messageId: messageId, userId: messageUserId, username: username, message: message });
                newMsgs = user2Msgs[j].userMessages;
            }
        }
        await user1.save();
        await user2.save();

        io.emit('fetched-new-messages', { userMessages: newMsgs });

    } catch (err) {
        console.log(err);
        throw err;
    }
    // User.findById({ _id: userId1 })
    //     .then((user) => {
    //         let messages = user.messages;
    //         for (let i = 0; i < messages.length; i++) {
    // if (messages[i].createdId.toString() === roomId) {
    //     messages[i].userMessages.push({ messageId: messageId, userId: messageUserId, username: username, message: message });
    // }
    //             user.save();
    //             io.emit('fetched-new-messages', { userMessages: messages[i].userMessages });
    //             // socket.broadcast.to(roomId).emit('fetched-new-messages', { userMessages: messages[i].userMessages });
    //         }
    //     })

    // User.findById({ _id: userId2 })
    //     .then((user) => {
    //         let messages = user.messages;
    //         for (let i = 0; i < messages.length; i++) {
    //             if (messages[i].createdId.toString() === roomId) {
    //                 messages[i].userMessages.push({ messageId: messageId, userId: messageUserId, username: username, message: message });
    //             }
    //             user.save()
    //         }
    //     })
};

// fetching data inside room
exports.fetchRoom = (io, userId, roomId) => {
    User.findOne({ _id: userId })
        .then((user) => {
            if (user.messages.length === 0) {
                io.emit('fetch-room-data')
                return;
            }
            let messages = user.messages;
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    io.emit('fetch-room-data', { roomId: messages[i].createdId, room: messages[i].room, users: messages[i].users, userMessages: messages[i].userMessages })
                }
            }
        }).catch((err) => {
            if (err) {
                throw err;
            }
        })
}

// delete a message 
exports.deleteMessage = (io, userId1, userId2, roomId, msgId) => {

    User.findOne({ _id: userId1 })
        .then((user) => {

            let messages = user.messages;
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {
                    console.log('found the createdId1');
                    messages[i].userMessages = messages[i].userMessages.filter(
                        ({ messageId }) => messageId !== msgId
                    );
                    console.log(messages[i].userMessages);
                }
                user.save();
                io.emit('fetched-deleted-messages', { userMessages: messages[i].userMessages });
            }
        })

    User.findOne({ _id: userId2 })
        .then((user) => {

            let messages = user.messages;
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].createdId.toString() === roomId) {

                    messages[i].userMessages = messages[i].userMessages.filter(
                        ({ messageId }) => messageId !== msgId
                    );
                    console.log(messages[i].userMessages)
                }
                user.save();
            }
        })
}