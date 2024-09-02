const express = require('express');
const router = express.Router();
const {register,login,logout,userDetails,getUserDetails }  = require('../controllers/user');

const { isAuthenticated} = require('../middleware/userAuth');

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/details',isAuthenticated,userDetails);
router.get('/details/:id',isAuthenticated,getUserDetails );



module.exports = router;