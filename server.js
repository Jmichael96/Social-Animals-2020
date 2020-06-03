require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path');
const connectDB = require('./services/db');
const routes = require('./routes/index');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ChatController = require('./controllers/chat');
const isAuthenticated = require('./middleware/check-auth');

// connecting database
connectDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

const normalizePort = (val) => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(PORT);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
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

  // fetch all chat data for authenticated user
  socket.on('fetchChatMessages', (userId) => {
    ChatController.fetchAllChatMessages(io, userId);
  });
});

server.listen(PORT, () => {
  console.log(`Bears... Beets... Battlestar Galactica on Port ${port}`);
});