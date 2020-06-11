const ChatController = require('../../controllers/chat');
const users = [];

module.exports = (io, socket) => {
    // socket.on('auth', (data) => {
    //     if (data) {
    //         users.push({ _id: data._id, id: socket.id, username: data.username });
    //     }
    //     console.log(users);
    // });

    // notify
    // socket.on('notify', (data) => {
    //     console.log(data);
    //     console.log(ChatController.findUser(data.notifiedUser));
    //     io.to(data.notifiedUser).emit('notification', data);
    // });
};