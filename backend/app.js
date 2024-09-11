require('dotenv').config({path:'./config/.env'});
const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Some Data is here');
})



// User Routers:
const userRoutes  = require('./routes/userRoutes');
app.use('/api/v1',userRoutes);


// Message Router:
const messageRouter  = require('./routes/message');
app.use('/api/message',messageRouter);


//Chat Routes:
const chatRoutes  = require('./routes/chatRouters');
app.use('/api/chats',chatRoutes);


//Search Routes
const searchRouter  = require('./routes/searchUser');
app.use('/api/search',searchRouter);



// Error handling middleware should be the last middleware
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);


module.exports = app;