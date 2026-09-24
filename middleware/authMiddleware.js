const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
const authHeader = req.headers.authorization;

if (!authHeader) {
return res.status(401).json({
message: "No token provided"
});
}

const token = authHeader.split(" ")[1];

try {
const decoded = jwt.verify(
token,
process.env.JWT_SECRET
);

const userId = decoded.userId || decoded.id || decoded._id;

const user = await User.findById(userId);

if (!user) {
return res.status(404).json({
message: "User not found"
});
}

if (user.isBlocked) {
return res.status(403).json({
message: "Your account has been blocked."
});
}

req.user = decoded;

next();

} catch (error) {
return res.status(401).json({
message: "Invalid or expired token"
});
}
};

module.exports = authMiddleware;