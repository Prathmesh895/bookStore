const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userScema');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const user = new User({
      email,
      password,
      verificationToken: crypto.randomBytes(32).toString('hex'),
    });
    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Email Verification',
      text: `Please verify your email by clicking this link: ${process.env.BASE_URL}/verify/${user.verificationToken}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).send('Failed to send verification email');
      res.status(200).send('Registration successful. Please check your email to verify your account.');
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Email Verification Route
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) return res.status(400).send('Invalid or expired verification link');

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).send('Email verified successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');
    if (!user.isVerified) return res.status(400).send('Email not verified');
    
    // Assuming comparePassword is a method in your User schema for comparing hashed passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
