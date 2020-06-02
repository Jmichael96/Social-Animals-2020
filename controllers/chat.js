const Chat = require('../models/chat');

exports.addChat = (io, T) => {
    const chat = new Chat({
        text: T
    });
    chat.save()
        .then((text) => {
            io.emit('TextAdded', text);
        })
}

exports.join = (io, room, userObj) => {
    const chat = new Chat({
        room: room,
        users: userObj
    });
    console.log(chat);
    chat.save().then((chat) => {
        console.log(chat);
        io.emit('chatCreated', chat);
    })
};

exports.sendMessage = (io, room, userId, username, message) => {
    Chat.findOneAndUpdate({ room: room })
    .then((chat) => {
        chat.userMessages.unshift({ userId: userId, username: username, message: message });

        chat.save();
        // io.to(room).emit('message', { username: username, text: message });

        console.log(chat)
    })
};

exports.getUser = (id, room) => {
    Chat.findOne({ room: room })
    .then((chat) => {
        chat.users
    })
}