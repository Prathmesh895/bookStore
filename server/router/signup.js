const express = require('express');
const { User } = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/signup', async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        console.log(userName, email, password, role);

        // Check if user with the email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with email already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            userName,
            password: hashPassword,
            email,
            role,
        });
        await newUser.save();

        // Create a token for email verification
        const token = jwt.sign({ id: newUser._id }, process.env.KEY, { expiresIn: '1h' });

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MYEMAIL,
                pass: process.env.MYEMAILpassword
            }
        });

        // Encode the token to be URL safe
        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");

        // Define email options
        const mailOptions = {
            from: process.env.MYEMAIL,
            to: email,
            subject: 'Verify Your Account',
            text: `Click the following link to verify your account: http://localhost:5173/verify-email/${encodedToken}`
        };

        // Send the verification email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error.message);
                return res.status(500).json({ message: 'Error sending verification email' });
            } else {
                console.log('Verification email sent: ' + info.response);
                return res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
            }
        });

    } catch (error) {
        console.error("User registration failed:", error.message);
        return res.status(500).json({ message: "User registration failed", error: error.message });
    }
});

router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Decode the token
        const decoded = jwt.verify(token, process.env.KEY);

        // Find the user by the ID stored in the token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid token or user not found" });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        // Update the isVerified field
        user.isVerified = true;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        console.error("Verification failed:", error.message);
        return res.status(500).json({ message: "Verification failed", error: error.message });
    }
});


module.exports = router;
