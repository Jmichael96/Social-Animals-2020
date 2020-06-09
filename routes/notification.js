const router = require('express').Router();
const isAuthenticated = require('../middleware/check-auth');
const NotifyController = require('../controllers/notification');

// @route    POST api/notify/notify_user
// @desc     Adding a notification for the specified user
// @access   Private
router.post('/notify_user', isAuthenticated, NotifyController.notifyUser);

// @route    GET api/notify/fetch_notifications
// @desc     Fetching all notifications for the authenticated user
// @access   Private
router.get('/fetch_notifications', isAuthenticated, NotifyController.fetchNotifications);

module.exports = router;