const path = require('path');
const router = require('express').Router();
const auth = require('./auth');
const posts = require('./posts');
const profile = require('./profile');

router.use('/api/auth', auth);
router.use('/api/posts', posts);
// router.use('/api/profile', profile);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router;