const express = require('express');
const { User } = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Forgot Password Route
router.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MYEMAIL,
                pass: process.env.MYEMAILpassword
            }
        });

        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
        const mailOptions = {
            from: process.env.MYEMAIL,
            to: email,
            subject: 'Reset Password',
            text: `Click the following link to reset your password: https://book-store-prathmeshgl.vercel.app/reset-password/${encodedToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error.message);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Reset password email sent' });
            }
        });

    } catch (error) {
        console.error("Forgot password failed:", error.message);
        return res.status(500).json({ message: "Forgot password failed", error: error.message });
    }
});

// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(token, process.env.KEY);
        const userId = decoded.id;

        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(userId, { password: hashPassword });

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password failed:", error.message);
        return res.status(500).json({ message: "Reset password failed", error: error.message });
    }
});

const verifyUser = async(req,res,next)=>{
    try {
        const token= req.cookies.token;
        if(!token){
            return res.json({message:"No token"}).status(false);
        }
        const decoded = jwt.verify(token,process.env.KEY);
        next();
    } catch (error) {
        
    }
}

router.get("/verify",verifyUser,(req,res)=>{
  return res.json({message:'Autherized'})
})


module.exports = router;
