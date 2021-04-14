const express = require('express');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 3001;

// establishing database connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, console.log(`Running on ${PORT}`));