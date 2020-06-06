const ChatController = require('../../controllers/chat');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('connected to socket.io!');

    // send a message
    socket.on('sendMessage', (roomId, userId1, userId2, messageUserId, username, message) => {
      ChatController.sendMessage(io, roomId, userId1, userId2, messageUserId, username, message);
      io.emit('receive-message', { userId: messageUserId, username: username, message: message });
    });

    // fetch room data
    socket.on('fetchRoom', (userId, roomId) => {
      ChatController.fetchRoom(io, userId, roomId);
    });

    // delete a message 
    socket.on('deleteMessage', (userId1, userId2, roomId, msgId) => {
      ChatController.deleteMessage(io, userId1, userId2, roomId, msgId);
    });

    // on typing
    socket.on('typing', (data) => {
      if (data.typing == true) {
        io.emit('display', data);
      } else {
        io.emit('display', data);
      }
    });

    // disconnect method
    socket.on('disconnect', () => {
      console.log('user has left');
    });

  });
}