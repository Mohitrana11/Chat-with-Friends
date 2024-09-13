const app = require('./app');
const PORT = process.env.PORT || 4500;  // Fallback to 4500 if env PORT is undefined

const { createServer } = require('http');
const server = createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

require('./config/database');  // Ensure database is connected

const io = new Server(server, {
    cors: {
        origin: '*',  // Allow all origins for simplicity
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('setup', (userData) => {
        socket.join(userData._id);  // Joining the user's unique room
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);  // Joining a specific chat room
        console.log('User joined room:', room);
    });

    socket.on('new message', (newMessage) => {
        const chat = newMessage.chat;
        if (!chat?.users) return console.log('Chat.users not defined');

        chat.users.forEach((user) => {
            if (user._id === newMessage.sender._id) return;  // Skip the sender

            // Emit message to other users in the room
            socket.to(user._id).emit('message received', newMessage);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const servers = server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

// Graceful shutdown for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down server due to uncaught exception');
    servers.close(() => process.exit(1));
});


process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down server due to unhandled rejection');
    servers.close(() => process.exit(1));
});
