const notificationSockets = require('./notifications/notifications');
const chatSockets = require('./chat/index');
// const users = [];
module.exports = (io) => {
    io.on('connection', (socket) => {

        console.log('Connected to Socket.io!!');

        // chat sockets 
        chatSockets(io, socket);

        // notification sockets
        notificationSockets(io, socket);
        // socket.on('auth', (data) => {
        //     if (data) {
        //         users.push({ _id: data._id, id: socket.id, username: data.username });
        //     }
        //     console.log(users);
        // });

        // socket.on('like', (data) => {
        //     for (let i = 0 ; i < users.length; i++) {
        //         if (users[i]._id.toString() === data.notifiedUser) {
        //             console.log(`${data.username} has liked ${users[i].username}'s post`);
        //             io.to(users[i]._id).emit('likeData', `${data.username} has liked ${users[i].username}'s post`)
        //         }
        //     }
        // });

        // disconnect method
        socket.on('disconnect', () => {
            // const user = removeUser(socket.id);
            // if (user) {
            //     console.log(`${user.username} has left`)
            // }
        });
    });
}

// const removeUser = (id) => {
//     const index = users.findIndex((user) => user.id === id);

//     if (index !== -1) return users.splice(index, 1)[0];
// }

