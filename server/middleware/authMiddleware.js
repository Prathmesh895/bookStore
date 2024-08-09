const { User } = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findById(decoded.id);
        if (!user || !user.isVerified) {
            return res.status(401).json({ message: "Unauthorized, please verify your email" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authorization failed:", error.message);
        return res.status(500).json({ message: "Authorization failed", error: error.message });
    }
};

module.exports = { verifyUser };
