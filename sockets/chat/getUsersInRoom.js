const users = [];
const getUsersInRoom = (room) => users.filter((user) => user.room === room);
module.exports = getUsersInRoom;