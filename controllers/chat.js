const User = require('../models/user');

exports.sendMessage = async (io, roomId, userId1, userId2, messageUserId, username, message, messageId) => {
    try {
        const user1 = await User.findById({ _id: userId1 });
        const user2 = await User.findById({ _id: userId2 });

        let user1Msgs = user1.messages;
        let user2Msgs = user2.messages;
        // variable to attach the updated messages to emit
        let newMsgs;
        // finding user 1 and adding the message
        for (let i = 0; i < user1Msgs.length; i++) {
            if (user1Msgs[i].createdId.toString() === roomId) {
                user1Msgs[i].userMessages.push({ messageId: messageId, userId: messageUserId, username: username, message: message });
            }
        }
        // finding user two and adding the message
        for (let j = 0; j < user2Msgs.length; j++) {
            if (user2Msgs[j].createdId.toString() === roomId) {
                user2Msgs[j].userMessages.push({ messageId: messageId, userId: messageUserId, username: username, message: message });
                newMsgs = user2Msgs[j].userMessages;
            }
        }
        // saving the users data
        await user1.save();
        await user2.save();

        // emitting the data to the front end
        io.emit('fetched-new-messages', { userMessages: newMsgs });

    } catch (err) {
        console.log(err);
        throw err;
    }
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
exports.deleteMessage = async (io, userId1, userId2, roomId, msgId) => {

    try {
        const user1 = await User.findById({ _id: userId1 });
        const user2 = await User.findById({ _id: userId2 });

        let user1Msgs = user1.messages;
        let user2Msgs = user2.messages;
        // variable to attach the updated messages to emit
        let newMsgs;
        for (let i = 0; i < user1Msgs.length; i++) {
            if (user1Msgs[i].createdId.toString() === roomId) {
                user1Msgs[i].userMessages = user1Msgs[i].userMessages.filter(
                    ({ messageId }) => messageId !== msgId
                )
            }
            // assigning the variable with the updated messages
            newMsgs = user1Msgs[i].userMessages;
        }
        for (let j = 0; j < user2Msgs.length; j++) {
            if (user2Msgs[j].createdId.toString() === roomId) {
                user2Msgs[j].userMessages = user2Msgs[j].userMessages.filter(
                    ({ messageId }) => messageId !== msgId
                )
            }
        }
        // saving the users data
        await user1.save();
        await user2.save();

        console.log(newMsgs);
        // emitting the data
        io.emit('fetched-deleted-messages', { userMessages: newMsgs });

    } catch (err) {
        console.log(err);
        throw err;
    }
}