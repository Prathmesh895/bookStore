const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenBlacklistSchema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Tokens expire after 7 days
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
