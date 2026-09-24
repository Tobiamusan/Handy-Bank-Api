const User = require("../models/User.js");

const getAccountNumber = async (req, res) => {
try {
const { phone } = req.body;

const user = await User.findOne({ phone });

if (!user) {
return res.status(404).json({
message: "User not found"
});
}

res.status(200).json({
accountNumber: user.accountNumber
});
} catch (error) {
res.status(500).json({
message: "Server error",
error: error.message
});
}
};

const getAllUsers = async (req, res) => {
try {
const users = await User.find().select("-password");

res.status(200).json({
users
});
} catch (error) {
res.status(500).json({
message: "Server error",
error: error.message
});
}
};
// admin can block a user who defaulted
const blockUser = async (req, res) => {
try {
const { userId } = req.params;

const user = await User.findById(userId);

if (!user) {
return res.status(404).json({
message: "User not found"
});
}

user.isBlocked = true;
await user.save();

res.status(200).json({
message: "User blocked successfully"
});

} catch (error) {
res.status(500).json({
message: "Server error",
error: error.message
});
}
};


//admin can see total number of registered users
const getUserCount = async (req, res) => {
try {
const totalUsers = await User.countDocuments();
res.status(200).json({
totalUsers
});

} catch (error) {
res.status(500).json({
message: "Server error",
error: error.message
});
}
};

module.exports = {
getAccountNumber,
getAllUsers,
blockUser,
getUserCount
};