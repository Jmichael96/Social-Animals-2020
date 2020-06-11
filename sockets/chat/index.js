const ChatController = require('../../controllers/chat');

module.exports = (io, socket) => {

  socket.on('subscribe', (room) => {
    console.log('joining room ', room);
    socket.join(room);
  })

  // send a message
  socket.on('sendMessage', (roomId, userId1, userId2, messageUserId, username, message, messageId, recipientUser) => {
    ChatController.sendMessage(io, roomId, userId1, userId2, messageUserId, username, message, messageId, recipientUser);
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

}