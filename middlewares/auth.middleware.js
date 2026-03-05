const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                isSuccess: false,
                message: "No token provided!"
            });
        }

        const realToken = token.split(" ")[1];

        const decoded = jwt.verify(realToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            isSuccess: false,
            message: "Invalid token!"
        });
    }
};