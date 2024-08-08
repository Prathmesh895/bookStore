const mongoose = require('mongoose')

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DataBase");
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = {ConnectDB}