const Notification = require('../models/notification');

// @route    POST api/notify/notify_user
// @desc     Adding a notification for the specified user
// @access   Private
exports.notifyUser = (req, res, next) => {
    if (req.body.notifiedUser === req.user._id) {
        console.log('you dont need to be notified');
        return;
    }

    const notification = new Notification({
        notifiedUser: req.body.notifiedUser,
        userId: req.body.userId,
        username: req.body.username,
        notificationType: req.body.notificationType,
        roomId: req.body.roomId,
        profilePic: req.body.profilePic,
        link: req.body.link,
        type: req.body.type
    });

    notification.save()
        .then((notification) => {
            if (!notification) {
                return;
            }
            console.log(notification);
            return res.status(201).json(notification);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'There was a problem with our server...'
            });
        });
}

// @route    GET api/notify/fetch_notifications
// @desc     Fetching all notifications for the authenticated user
// @access   Private
exports.fetchNotifications = (req, res, next) => {
    Notification.find({ notifiedUser: req.user._id }).sort({ _id: -1 })
        .then((notifications) => {
            res.status(201).json(notifications);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'There was a problem with our server...'
            });
        });
}

// @route    PUT api/notify/has_viewed/:id/:type
// @desc     Updating all notifications setting hasViewed to true once user has seen them
// @access   Private
exports.hasViewed = (req, res, next) => {
    Notification.updateMany({ notifiedUser: req.params.id, type: req.params.type }, {
        $set: {
            'hasViewed': true
        }
    }).then((result) => {
        if (result.n > 0) {
            return res.status(200).json({ serverMsg: 'Updated notifications successfully' });
        } else {
            return res.status(401).json({ serverMsg: 'Not authorized' });
        };
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            serverMsg: 'There was a problem with our server...'
        });
    });
    
}