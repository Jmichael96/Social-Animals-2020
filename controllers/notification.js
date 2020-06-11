const Notification = require('../models/notification');

// @route    POST api/notify/notify_user
// @desc     Adding a notification for the specified user
// @access   Private
exports.notifyUser = (req, res, next) => {
    if (req.body.notifiedUser.toString() === req.user._id) {
        console.log('you dont need to be notified')
        return;
    }
    const notification = new Notification({
        notifiedUser: req.body.notifiedUser,
        userId: req.body.userId,
        username: req.body.username,
        notificationType: req.body.notificationType,
        roomId: req.body.roomId,
        profilePic: req.body.profilePic,
        link: req.body.link
    });

    notification.save()
        .then((notification) => {
            res.status(201);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'There was a problem with our server...'
            })
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

// @route    PUT api/notify/has_viewed/:id
// @desc     Updating all notifications setting hasViewed to true once user has seen them
// @access   Private
exports.hasViewed = (req, res, next) => {
    Notification.updateMany({ notifiedUser: req.params.id }, {
        $set: {
            'hasViewed': true
        }
    }).then((notifications) => {
        console.log(notifications);
        res.status(201);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            serverMsg: 'There was a problem with our server...'
        });
    });
    
}