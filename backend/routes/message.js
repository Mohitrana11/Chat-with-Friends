const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/userAuth');
const { allMessages, sendMessage } = require('../controllers/message');

router.get('/:receiverId', isAuthenticated, allMessages);
router.post('/:receiverId', isAuthenticated, sendMessage);

module.exports = router;
