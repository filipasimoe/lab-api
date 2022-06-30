const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const mySQL = require('mysql');
const cors = require('cors');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

let saltRounds = 10;

/* Register user with email, password and isAdmin
    Returns IDU if successfull
    Returns IDU = 0 if error
*/
router.post('/register', async (request, result) => {
    //Validate data before adding user
    const {error} = registerValidation(request.body);

    console.log(request.body)
    if(error) return result.status(400).send(error.details[0].message);

    //Checking if user already exists in the database
    let userExists = "SELECT email FROM users WHERE email='" + request.body.email + "';";

    db.query(userExists, (err, res) => {
        if(err) throw err;

        // If user exists
        if(res.length > 0) {
            // IDU 0 means error with register
            result.status(400).send({
                "IDU": 0
            });
        }
        else {
            // If user doesn't exist, hash the password and insert user in db
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(request.body.password, salt, function(err, hash) {
                  let insertUser= "INSERT INTO users (email, password, isAdmin) Values ('" + request.body.email + "', '" + hash + "', '" + request.body.isAdmin + "');";
                  
                  db.query(insertUser, (err,res2) => {
                        if(err) throw err;
                        
                        let getUserID = "SELECT IDU FROM users WHERE email='" + request.body.email + "';";

                        // Send the user ID in the result
                        db.query(getUserID, (err, res3) => {
                            result.status(200).send({
                                "IDU": res3[0].IDU
                            });
                            
                        });

                    });

                });

            });
        }
    });
});

/* Login user with email and password
    Returns IDU if successfull
    Returns IDU = 0 if error
*/
router.post('/login', async (request, result) => {
    console.log("1")
    const {error} = loginValidation(request.body);

    if(error) return result.status(400).send(error.details[0].message);
    console.log("2")

    let userExists = "SELECT * FROM users WHERE email='" + request.body.email + "';";
    
    // Check if email exists
    db.query(userExists, (err, queryRes) => {
        console.log("3")

        if(err) throw err;

        // Compares request password with db password
        bcrypt.compare(request.body.password, queryRes[0].password, function(err, compareRes) {
            if(err) throw err;

            // bcrypt returns true if the passwords match
            if(compareRes) {
                //Create and assign token
                const token = jwt.sign({ _id: queryRes[0].IDU }, process.env.TOKEN_SECRET);

                result.status(200).header('auth-token', token).send({
                    "IDU": queryRes[0].IDU
                });
            }
            else{
                console.log("4")
                // IDU 0 means error with login
                result.status(400).send({
                    "IDU": 0
                });
            }
        });
    });

});

module.exports = router;