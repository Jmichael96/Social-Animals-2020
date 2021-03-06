const path = require('path');
const router = require('express').Router();
const auth = require('./auth');
const posts = require('./posts');
const user = require('./user');
const notify = require('./notification');

router.use('/api/auth', auth);
router.use('/api/posts', posts);
router.use('/api/user', user);
router.use('/api/notify', notify);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router;