const path = require('path');
const router = require('express').Router();
const auth = require('./auth');
const posts = require('./posts');
const profile = require('./profile');

router.use('/api/auth', auth);
router.use('/api/posts', auth);
router.use('/api/profile', auth);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;