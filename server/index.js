const express = require('express');
const { ConnectDB } = require('./lib/conectDB');
const app = express();
require('dotenv').config();
const path = require('path')
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const bookRoute = require('./router/books')
const signupRoute = require('./router/user');
const signup = require('./router/signup')
const forpassRoute =  require('./router/password');
const cookieParser = require('cookie-parser')

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use(express.json());
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials:true
}));

app.use(cookieParser())

app.use('/books', bookRoute);
app.use('/api', signupRoute);
app.use('/passWord', forpassRoute);
app.use('/api', signup);

app.get(('/'), (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome");
})


ConnectDB();
app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})