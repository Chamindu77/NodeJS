require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

//connect to database
connectDB();

//middleware
app.use(express.json());

//routes
app.use('/api/v1/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


