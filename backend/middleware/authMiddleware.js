const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Not authorized! No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id).select("-password");
            if (user) {
                return res.json({
                    status: true,
                    user: user
                });
            } else {
                return res.json({
                    status: false
                });
            }
        }
    })
};

module.exports = { protect };