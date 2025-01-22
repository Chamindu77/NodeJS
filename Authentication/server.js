require ('dotenv').config;
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const uploadRoutes = require('./routes/imageRoutes')

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/home', homeRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/images', uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


