// const express = require('express');
// const { ConnectDB } = require('./lib/conectDB');
// const app = express();
// require('dotenv').config();
// const path = require('path')
// const cors = require('cors');
// // const PORT = 5000;
// const bookRoute = require('./router/books')
// const loginRoute = require('./router/login');
// const signupRoute = require('./router/signup')
// const forpassRoute =  require('./router/password');
// const cookieParser = require('cookie-parser')


// app.use('/files', express.static(path.join(__dirname, 'files')));

// app.use(express.json());
// app.use(cors({
//     origin : ["https://book-store-prathmeshgl.vercel.app"],
//     credentials:true
// }));

// app.use(cookieParser())

// app.use('/books', bookRoute);
// app.use('/api', loginRoute);
// app.use('/passWord', forpassRoute);
// app.use('/api', signupRoute);

// app.get(('/'), (req, res) => {
//     console.log(req);
//     return res.status(200).send("Welcome");
// })


// ConnectDB();

// // app.listen(PORT, () => {
// //     console.log(`server is listening at ${PORT}`)
// // })

// module.exports = app;


const express = require('express');
const { ConnectDB } = require('./lib/conectDB');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bookRoute = require('./router/books');
const loginRoute = require('./router/login');
const signupRoute = require('./router/signup');
const forpassRoute = require('./router/password');
const cookieParser = require('cookie-parser');

// CORS configuration
app.use(cors({
    origin: "https://book-store-prathmeshgl.vercel.app",
    credentials: true,
}));
app.options('*', cors()); // Handle preflight requests

// Serve static files
app.use('/files', express.static(path.join(__dirname, 'files')));

// Disable caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/books', bookRoute);
app.use('/api', loginRoute);
app.use('/passWord', forpassRoute);
app.use('/api', signupRoute);

// Default route
app.get('/', (req, res) => {
    return res.status(200).send("Welcome");
});

// Connect to the database
ConnectDB();

// Module export for serverless deployment
module.exports = app;
