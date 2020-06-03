const Chat = require('../models/chat');

exports.join = (io, room, userObj) => {
    console.log('room here! ', room)
    const chat = new Chat({
        room: room,
        users: userObj
    });
    chat.save().then((chat) => {
        console.log(chat);
        io.emit('chat-created', { room: chat.room, users: chat.users, userMessages: chat.userMessages });
    })
        .catch((err) => {
            console.log(err);
            throw err;
        })
};

exports.sendMessage = (room, userId, username, message) => {
    Chat.findOneAndUpdate({ room: room })
        .then((chat) => {
            chat.userMessages.push({ userId: userId, username: username, message: message });
            chat.save();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
};

// fetching data inside room
exports.fetchRoom = (io, room) => {
    Chat.findOne({ room: room })
        .then((chat) => {
            io.emit('fetched-room', { room: chat.room, users: chat.users, userMessages: chat.userMessages });
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
}

// fetch the chats that the authenticated user is in
exports.fetchAllChatMessages = (io, userId) => {
    Chat.find().then((chat) => {
        let usersChatsArr = [];
        for (let i = 0; i < chat.length; i++) {
            let users = chat[i].users;
            for (let j = 0; j < users.length; j++) {
                if (users[j].userId.toString() === userId) {
                    usersChatsArr.push(chat[i]);
                }
            }
        }
        io.emit('fetch-chat-messages', { messages: usersChatsArr })
    })
        .catch((err) => {
            console.log(err);
            throw err;
        })
}