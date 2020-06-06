const User = require('../models/user');

exports.sendMessage = (io, roomId, userId1, userId2, messageUserId, username, message) => {

    User.findById({ _id: userId1 })
    .then((user) => {
        let messages = user.messages;
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].createdId.toString() === roomId) {
                messages[i].userMessages.push({ userId: messageUserId, username: username, message: message });
            }
            //  send the new array of messages after receiving the new one
            // io.emit('fetch-new-message', { userMessages: messages[i].userMessages });
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
             //  send the new array of messages after receiving the new one
            //  io.emit('fetch-new-message', { userMessages: messages[i].userMessages });
        }
        user.save()
    })
};

// fetching data inside room
exports.fetchRoom = (io, userId, roomId) => {
    User.findOne({ _id: userId})
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
                // send the new list of messages after removing the one message
                io.emit('fetch-removed-message', { userMessages: messages[i].userMessages });
            }
            else {
                return;
            }
        }
        user.save();
        
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
                // send the new list of messages after removing the one message
                io.emit('fetch-removed-message', { userMessages: messages[i].userMessages });
            }
            else {
                return;
            }
        }
        user.save();
        
    })
}