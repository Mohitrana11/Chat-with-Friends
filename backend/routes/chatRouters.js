const express = require('express');
const router = express.Router();
const {    accessChat,fetchChats,fetchGroups,createGroup,groupExit ,addSelfToGroup}  = require('../controllers/chatWith');

const { isAuthenticated} = require('../middleware/userAuth');

router.post('/',isAuthenticated,accessChat);
router.get('/',isAuthenticated,fetchChats);
router.post('/createGroup',isAuthenticated,createGroup);
router.get('/fetchGroups',isAuthenticated,fetchGroups);
router.put('/exitGroups',isAuthenticated,groupExit);
router.put('/addSelfToGroup',isAuthenticated,addSelfToGroup);



module.exports = router;