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
        // If user doesn't exist, hash the password and insert user in db
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(request.body.password, salt, function(err, hash) {
                let insertUser= "INSERT INTO users (email, password, isAdmin) Values ('" + request.body.email + "', '" + hash + "', '" + request.body.isAdmin + "');";
                
                db.query(insertUser, (err,res2) => {
                    if(err) throw err;
                    
                    let getUserID = "SELECT * FROM users WHERE email='" + request.body.email + "';";

                    // Send the user ID in the result
                    db.query(getUserID, (err, res3) => {
                        result.status(200).send({
                            "IDU": res3[0].IDU,
                            "email": res3[0].email
                        });
                        
                    });

                });

            });

        });
        
    });
});

/* Login user with email and password
    Returns IDU if successfull
    Returns IDU = 0 if error
*/
router.post('/login', async (request, result) => {
    const {error} = loginValidation(request.body);

    if(error) return result.status(400).send(error.details[0].message);

    let userExists = "SELECT * FROM users WHERE email='" + request.body.email + "';";
    
    // Check if email exists
    db.query(userExists, (err, queryRes) => {
        if(err) throw err;

        // If user not exists
        if(queryRes.length == 0) {
            result.status(400).send({
                "message": "user not found"
            });
        }
        else {
            // Compares request password with db password
            // TODO isto pode ficar logo entro de um if
            bcrypt.compare(request.body.password, queryRes[0].password, function(err, compareRes) {
                if(err) throw err;

                // bcrypt returns true if the passwords match
                if(!compareRes) {
                    // IDU 0 means error with login
                    // TODO substituir por mensagem tipo credenciais inválidas
                    result.status(400).send({
                        "message": "wrong credentials"
                    });
                }
                else {
                    // Create and assign token
                    const token = jwt.sign({ _id: queryRes[0].IDU }, process.env.TOKEN_SECRET);

                    // HTTP cookie cannot be accessed by the frontend, it works behind the scenes and it's more secure than sending the token directly
                    result.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000 // 1 day
                    });

                    result.status(200).send({
                        "IDU": queryRes[0].IDU,
                        "email": queryRes[0].email
                    });
                }            
            });
        }        
    });
});

router.get('/user', async (request, result) => {
    try {
        const cookie = request.cookies['jwt'];

        const claims = jwt.verify(cookie, process.env.TOKEN_SECRET);

        // not authenticates
        if(!claims) {
            result.status(401).send({                       // 401 - unauthorized
                "message": "unauthenticated"
            });
        }

        let getUser = "SELECT * FROM users WHERE IDU='" + claims._id + "';";

        db.query(getUser, (err, queryRes) => {
            if(err) throw err;

            // If user not exists
            if(queryRes.length == 0) {
                result.status(400).send({
                    "message": "user not found"
                });
            }

            result.send({
                'IDU': queryRes[0].IDU,
                'email': queryRes[0].email,
                'isAdmin': queryRes[0].isAdmin
            });
        });
    }
    catch(e) {
        result.status(401).send({                       // 401 - unauthorized
            "message": "unauthenticated"
        });
    }
});

// Removes the cookie
router.post('/logout', (request, response) => {
    response.cookie('jwt', '', {maxAge: 0});

    response.send({
        'message': 'success'
    }); 
});

module.exports = router;