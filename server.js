const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 3001;

// establishing database connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./router/index'));

// Use this to log mongo queries being executed!
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

app.listen(PORT, console.log(`Running on ${PORT}`));