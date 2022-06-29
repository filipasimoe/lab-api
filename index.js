const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () => 
    console.log('Connected to DB')
);

app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server running'));  