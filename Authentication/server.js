require ('dotenv').config;
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


