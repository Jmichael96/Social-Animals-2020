const users = [];
const getUser = (id) => users.find((user) => user.id === id);
module.exports = getUser;