const app = require('./app');
const PORT  = process.env.PORT;

require('./config/database');

// Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Uncaught Exception`);
//     process.exit(1);
// });





// Setting up server:
const server = app.listen(PORT,()=>{
    console.log(`backend Running on http://localhost/${PORT}`);
})


// Unhandled Promise Rejection:
// process.on("unhandledRejection", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Unhandled Promise Rejection`);
//     server.close(() => {
//         process.exit(1);
//     });
// });
