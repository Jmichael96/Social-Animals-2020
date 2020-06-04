const ChatController = require('../../controllers/chat');

module.exports = (io) => {
  io.on('connection', (socket) => {

    console.log('connected to socket.io!');

    // join room and start a chat room
    socket.on('join', (room, userObj) => {
      ChatController.join(io, room, userObj);
    });

    // send a message
    socket.on('sendMessage', (roomId, userId1, userId2, messageUserId, username, message) => {
      ChatController.sendMessage(roomId, userId1, userId2, messageUserId, username, message);
      io.emit('receive-message', { userId: messageUserId, username: username, message: message });
    });

    // fetch room data
    socket.on('fetchRoom', (userId, roomId) => {
      ChatController.fetchRoom(io, userId, roomId);
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
      console.log('user has left')
    })
  });
}