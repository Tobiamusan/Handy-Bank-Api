const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const generateAccountNumber = async () => {
let accountNumber;
let exists = true;

while (exists) {
accountNumber = Math.floor(
1000000000 + Math.random() * 9000000000
).toString();

exists = await User.exists({ accountNumber });
}

return accountNumber;
};

const signup = async (req, res) => {
try {
const { firstName, lastName, email, phone, password } = req.body;

if (!firstName || !lastName || !email || !phone || !password) {
return res.status(400).json({
message: "All fields are required"
});
}

const existingUser = await User.findOne({
$or: [{ email }, { phone }]
});

if (existingUser) {
return res.status(409).json({
message: "Email or phone number already exists"
});
}

const hashedPassword = await bcrypt.hash(password, 10);
const accountNumber = await generateAccountNumber();

const user = await User.create({
firstName,
lastName,
email,
phone,
password: hashedPassword,
accountNumber
});

res.status(201).json({
message: "Account created successfully",
user: {
id: user._id,
firstName: user.firstName,
lastName: user.lastName,
email: user.email,
phone: user.phone,
accountNumber: user.accountNumber
}
});
} catch (error) {
res.status(500).json({
message: "Server error",
error: error.message
});
}
};

const login = async (req, res) => {
try {
const { phone, password } = req.body;

if (!phone || !password) {
return res.status(400).json({
message: "Phone and password are required"
});
}

const user = await User.findOne({ phone });

if (!user) {
return res.status(401).json({
message: "Invalid phone or password"
});
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
return res.status(401).json({
message: "Invalid phone or password"
});
}

const token = jwt.sign(
{
userId: user._id,
role: user.role
},
process.env.JWT_SECRET,
{
expiresIn: "1d"
}
);

res.status(200).json({
message: "Login successful",
token,
user: {
id: user._id,
firstName: user.firstName,
lastName: user.lastName,
phone: user.phone,
email: user.email,
accountNumber: user.accountNumber,
role: user.role
}
});
} catch (error) {
res.status(500).json({
message: "Server error",
error: error.message
});
}
};

module.exports = {
signup,
login
};