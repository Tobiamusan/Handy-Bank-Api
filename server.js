const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const bankRoutes = require('./routes/bankRoutes');

require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/handy-bank');
        console.log('MongoDB connected successfuly!');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/bank", bankRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
res.status(200).json({
message: 'Handy Bank API is running successfully'
});
});

app.get('/api/protected', authMiddleware, (req, res) => {
res.status(200).json({
message: 'You accessed a protected route',
user: req.user
});
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});