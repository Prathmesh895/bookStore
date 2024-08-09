const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: { type: String, require: true },
    email: { type: String, require: true ,unique:true},
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ["author", "reader"] },
    isVerified: { type: Boolean, default: false } 
}, { timestamp: true }
)

const User = mongoose.model("User", userSchema);

module.exports = { User }