// const app = require('./app');
// const PORT = process.env.PORT || 4500;

// const { createServer } = require('http');
// const server = createServer(app);
// const { Server } = require('socket.io');
// const cors = require('cors');

// app.use(cors());

// require('./config/database');

// const io = new Server(server, {
//   cors: {
//     origin: '*',// Allow all origins for simplicity
//     methods: ['GET', 'POST']
//   }
// });

// // io.on('connection', (socket) => {
// //   console.log('New client connected:', socket.id);

// //   socket.on('setup', async (userData) => {
// //     try {
// //       if (!userData || !userData._id) {
// //         throw new Error('Invalid user data');
// //       }
// //       socket.join(userData._id);
// //       socket.emit('connected');
// //     } catch (err) {
// //       console.error('Error setting up user:', err.message);
// //     }
// //   });

// //   socket.on('join chat', async (room) => {
// //     try {
// //       if (!room) {
// //         throw new Error('Invalid room');
// //       }
// //       socket.join(room);
// //       console.log('User joined room:', room);
// //     } catch (err) {
// //       console.error('Error joining room:', err.message);
// //     }
// //   });

// //   socket.on('new message', async (newMessage) => {
// //     try {
// //       const chat = newMessage.chat;
// //       if (!chat || !chat.users) {
// //         throw new Error('Invalid chat or users');
// //       }

// //       chat.users.forEach((user) => {
// //         if (user._id === newMessage.sender._id) return;  // Skip the sender

// //         // Emit message to other users in the room
// //         socket.to(user._id).emit('message received', newMessage);
// //       });
// //     } catch (err) {
// //       console.error('Error sending new message:', err.message);
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('Client disconnected:', socket.id);
// //     // Clean up socket from chat rooms
// //     socket.rooms.forEach((room) => {
// //       socket.leave(room);
// //     });
// //   });
// // });



// const servers = server.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });

// process.on('uncaughtException', (err) => {
//   console.error(`Error: ${err.message}`);
//   console.error('Shutting down server due to uncaught exception');
//   servers.close(() => process.exit(1));
// });

// process.on('unhandledRejection', (err) => {
//   console.error(`Error: ${err.message}`);
//   console.error('Shutting down server due to unhandled rejection');
//   servers.close(() => process.exit(1));
// });





const app = require('./app');
const PORT = process.env.PORT || 4500;
const { createServer } = require('http');
const server = createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
const Chat = require('./models/chatModel');


require('./config/database');


const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for simplicity
    methods: ['GET', 'POST']
  }
});


io.on('connection', (socket) => {
  // console.log('New client connected:', socket.id);

  socket.on('setup', (userData) => {
    // if (!userData || !userData._id) {
    //   return console.error('Invalid user data');
    // }
    socket.join(userData._id);
    socket.emit('connected');
    console.log(`User ${userData._id} joined`);
  });

  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log('User join Room '+room);
  })
  // Handle new message
  // socket.on('new message',(newMessage) => {
  //   var chat = newMessage.chat;
  //   if(!chat.users) return console.log('chat user not defined! ');

  // });

  socket.on('new message', async (newMessage) => {
    console.log('New message received:', newMessage);
    try {
      const chat = await Chat.findById(newMessage?.conversationId).populate('users', '_id');
      console.log(chat);
      if (!chat || !chat.users) {
        return console.error('Invalid chat or users----12122');
      }

      // Emit the message to all users except the sender
      chat.users.forEach((user) => {
        if (user._id.toString() === newMessage.senderId) return;
        // socket.to(user._id).emit('message received', newMessage);
        socket.in(user._id).emit('message received', newMessage);
      });
    } catch (error) {
      console.error('Error sending new message:', error.message);
    }
  });


  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});




// Start the server
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// Graceful shutdown on exceptions
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
