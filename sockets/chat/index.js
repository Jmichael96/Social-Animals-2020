const ChatController = require('../../controllers/chat');

module.exports = (io) => {
  io.on('connection', (socket) => {

    console.log('connected to socket.io!');
    socket.on('addText', (text) => {
      ChatController.addChat(io, text);
    });

    // join room and start a chat room
    socket.on('join', (room, userObj) => {
      ChatController.join(io, room, userObj);
    });

    // send a message
    socket.on('sendMessage', (room, userId, username, message) => {
      ChatController.sendMessage(room, userId, username, message);
      io.emit('receive-message', { userId: userId, username: username, message: message });
    });

    // fetch room data
    socket.on('fetchRoom', (room) => {
      ChatController.fetchRoom(io, room);
    });

    // disconnect method
    socket.on('disconnect', () => {
      console.log('user has left')
    })
  });
}