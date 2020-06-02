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
// io.adapter(redis({ host: 'localhost', port: PORT }));

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
// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
app.use(routes);

io.on('connection', (socket) => {

  console.log('connected to socket.io!');
  socket.on('addText', (text) => {
    ChatController.addChat(io, text);
  });

  socket.on('join', (room, userObj) => {
    ChatController.join(io, room, userObj);
  });

  socket.on('sendMessage', (room, userId, username, message) => {
    ChatController.sendMessage(room, userId, username, message);
    io.emit('receive-message', { userId: userId, username: username, message: message });
  });
  
  socket.on('fetchRoom', (room) => {
    ChatController.fetchRoom(io, room);
  })
});
// io.on('connect', (socket) => {
//     socket.on('join', ({ name, room }, callback) => {
//       const { error, user } = addUser({ id: socket.id, name, room });

//       if(error) return callback(error);

//       socket.join(user.room);

//       socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//       socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//       callback();
//     });

//     socket.on('sendMessage', (message, callback) => {
//       const user = getUser(socket.id);

//       io.to(user.room).emit('message', { user: user.name, text: message });

//       callback();
//     });

//     socket.on('disconnect', () => {
//       const user = removeUser(socket.id);

//       if(user) {
//         io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//       }
//     })
//   });

server.listen(PORT, () => {
  console.log(`Bears... Beets... Battlestar Galactica on Port ${port}`);
});