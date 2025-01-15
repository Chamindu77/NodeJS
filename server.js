require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');

const app = express();

const PORT = process.env.PORT || 3000;

//connect to database
connectDB();

//middleware
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//routes
