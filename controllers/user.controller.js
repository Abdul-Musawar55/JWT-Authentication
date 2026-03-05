const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

exports.signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                isSuccess: false,
                message: "All fields are required!"
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                isSuccess: false,
                message: "Email already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id, user.email);

        res.status(201).json({
            isSuccess: true,
            message: "Signup successful!",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Signup failed!",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                isSuccess: false,
                message: "User not found!"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid password!"
            });
        }

        const token = generateToken(user._id, user.email);

        res.status(200).json({
            isSuccess: true,
            message: "Login successful!",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Login failed!",
            error: error.message
        });
    }
};

