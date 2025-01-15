require ('dotenv').config;
const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

