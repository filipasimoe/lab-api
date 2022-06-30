const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const mySQL = require('mysql');
const cors = require('cors');

const port = 8000;

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.urlencoded({extended:true}));

//Import Routes
const authRoute = require('./routes/auth');
const researchRoute = require('./routes/researcher');
const projRoute = require('./routes/project');
const articleRoute = require('./routes/article');

dotenv.config();

// TODO meter credenciais no dotenv
const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL database!");
});

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/researcher', researchRoute);
app.use('/api/article', articleRoute);
app.use('/api/project', projRoute);

app.listen(port, () => {
    console.log(`rgpd-api listening at http://localhost:${port}`)
});