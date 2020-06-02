const router = require('express').Router();
// import ChatController from '../controllers/chatApiRoutes';
import isAuthenticated from '../middleware/check-auth';

// @route    GET api/chat/fetch_room
// @desc     Fetching the room to get all room data
// @access   Private
router.get('/fetch_room', isAuthenticated, ChatController.fetchRoom);

export default router;