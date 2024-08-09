const express = require('express');
const { User } = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const isVerified = user.isVerified;
        if (isVerified == false) {
            return res.status(400).json({ message: "User Is not Verified" });
        }

        // Include userName, role, and email in the JWT payload
        const token = jwt.sign(
            { userName: user.userName, role: user.role, email: user.email },
            process.env.KEY,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours

        //Return token and user info in the response
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                userName: user.userName,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login failed:", error.message);
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
});

module.exports = router;
