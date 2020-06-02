const Chat = require('../models/chat');

// exports.addChat = (io, T) => {
//     const chat = new Chat({
//         text: T
//     });
//     chat.save()
//         .then((text) => {
//             io.emit('TextAdded', text);
//         })
//         .catch((err) => {
//             console.log(err);
//             throw err;
//         })
// }

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


exports.fetchRoom = (io, room) => {
    Chat.findOne({ room: room })
    .then((chat) => {
       
        // console.log(array.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0])
        io.emit('fetched-room', { room: chat.room, users: chat.users, userMessages: chat.userMessages });
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
}