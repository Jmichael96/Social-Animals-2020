const Room = require('../../models/chat');
const users = [];
const addUser = ({ id, name, room }) => {
    console.log(users);
    // console.log(name)
    // Room.findByIdAndUpdate({ name: room })
    // .then((room) => {
    //     room.users.unshift({ id, name, room });
    // })
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };

    users.push(user);

    return { user };
}

module.exports = addUser;