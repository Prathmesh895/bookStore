const express = require('express');
const router = express.Router();
const TokenBlacklist = require('../models/tokenBlacklisted'); // Create a model for token blacklist

// Logout Route
router.post('/logout', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers

  try {
    if (!token) return res.status(401).send('Token required');

    // Add token to blacklist
    const blacklistedToken = new TokenBlacklist({ token });
    await blacklistedToken.save();

    res.status(200).send('Logged out successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
