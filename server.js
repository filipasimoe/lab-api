const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mySQL = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = 8000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Needed for request to/from different ports and to exchange cookies
app.use(cors({
    origin: ["http://localhost:3000"],          // frontend port
    methods: ["POST", "GET", "PUT", "DELETE"],  // methods used
    credentials: true,                          // to exchange cookies
}));

app.use(express.urlencoded({extended:true}));

// TODO meter credenciais no dotenv
const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL database!");
});

//Import Routes
const authRoute = require('./routes/auth');
const researchRoute = require('./routes/researcher');
const projRoute = require('./routes/project');
const articleRoute = require('./routes/article');

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/researcher', researchRoute);
app.use('/api/article', articleRoute);
app.use('/api/project', projRoute);

/*
app.listen(port, () => {
    console.log(`rgpd-api listening at http://localhost:${port}`)
});
*/

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  }, app);
  
  sslServer.listen(port, () => console.log(`Secure lab-api listening at https://localhost:${port}`));