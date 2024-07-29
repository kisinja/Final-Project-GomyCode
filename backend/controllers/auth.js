const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPasssword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPasssword });

        let token = generateToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        })


        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        let token = generateToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res.status(201).json({
            message: "User logged in sucessfully",
            success: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};


module.exports = { register, login };