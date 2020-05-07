const User = require('../models/user');

// @route    GET api/user/usernames
// @desc     Fetch all usernames
// @access   Private
exports.fetchUsernames = (req, res, next) => {
    User.find()
    .then((users) => {
        let usernameArr = [];
        users.filter((i) => {
            usernameArr.push({ _id: i._id, username: i.username });
        });
        res.status(201).json(usernameArr);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Error finding users!'
        });
    })
}