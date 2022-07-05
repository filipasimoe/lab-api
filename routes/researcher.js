const router = require('express').Router();
const verify = require ('./verifyToken');
const mySQL = require('mysql');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

// Add researcher to db. Returns Insert = 1 if successfull, Insert = 0 if not successfull
router.post('/add', (request, result) => {
    let name = request.body.name;
    let photo = request.body.photo;
    let bio = request.body.bio;
    let email = request.body.email;
    let role = request.body.role;


    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;
        // If the email doesn't exist, returns IDU = 0
        if(iRes.length == 0) {
            result.status(400).send({
                'message': 'Não existe nenhum utilizador associado a esse endereço de email'
            });      
        }
        else {

            // Checks whether there's already a researcher with that email
            let duplicate = "SELECT IDU FROM researchers WHERE IDU='" + iRes[0].IDU + "';";

            db.query(duplicate, (err, duplicateRes) => {
                if(err) throw err;
                 if(duplicateRes.length > 0) {
                    result.status(400).send({
                        'message': 'Já existe um investigador com esse endereço de email'
                    });
                 }
                 else {
                    let insert = "INSERT INTO `researchers`(`IDU`, `name`, `photo`, `bio`, `role`) VALUES ('" + iRes[0].IDU + "','" + name + "','" + photo + "','" + bio + "','" + role + "');";

                    db.query(insert, (err, insertRes) => {
                        if(err) throw err;
        
                        result.status(200).send({
                            'message': 'Investigador adicionado!'
                        }); 
                    });
                }
            });
        }
    }); 
});

/*  Updates researcher info
    Receives name, photo, bio, email
    Email can't be changed
    Returns Update = 1 if successfull, Update = 0 if not successfull
*/
router.put('/edit', (request, result) => {
    let name = request.body.name;
    let photo = request.body.photo;
    let bio = request.body.bio;
    let email = request.body.email;
    let role = request.body.role;

    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;
        // If the email doesn't exist, returns IDU = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "Update": 0
            });      
        }
        else {
            let update = "UPDATE `researchers` SET `name`='" + name + "',`photo`='" + photo + "',`bio`='" + bio + "', `role`='" + role + "' WHERE IDU='" + iRes[0].IDU + "';"

            db.query(update, (err, updateRes) => {
                if(err) throw err;

                result.status(200).send({
                    "Update": 1
                }); 
            });
        }

    });
    
});

/*  Returns the information for one researcher
    Receives email
*/
router.get('/info/:email', (request, result) => {
    let email = request.params.email;

    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {

        if(err) throw err;
        // If the email doesn't exist, returns IDU = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "message": "user doesn't exist"
            });      
        }
        else {

            let getInfo = "SELECT * FROM researchers WHERE IDU='" + iRes[0].IDU + "';";

            db.query(getInfo, (err, getRes) => {

                if(err) throw err;

                if(getRes.length == 0) {
                    result.status(200).send({
                        "message": "no researcher with that email yet"
                    });      
                }
                else {

                    result.status(400).send({
                        "message": "there's already a researcher with that email"
                    });  
                }
            });
        }

    });
    
});

/*  Returns all researchers
*/
router.get('/all', (request, result) => {
    let getInfo = "SELECT researchers.*, users.email, users.IDU FROM researchers, users WHERE researchers.IDU = users.IDU;";

    db.query(getInfo, (err, getRes) => {
        if(err) throw err;

        // If the IDP doesn't exist, returns Get = 0
        if(getRes.length == 0) {
            result.status(400).send({
                "Get": 0
            });      
        }

        result.status(200).send(getRes);

    });
});

/*  Deletes the information for one researcher
    Receives email
*/
router.delete('/delete', (request, result) => {
    let email = request.body.email;

    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;

        // If the email doesn't exist, returns Delete = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "Delete": 0
            });      
        }
        else {
            let deleteInfo = "DELETE FROM `researchers` WHERE IDU='" + iRes[0].IDU + "';";

            db.query(deleteInfo, (err, deleteRes) => {
                if(err) throw err;

                result.status(200).send({
                    "Delete": 1
                });

            });
        }

    });
})


module.exports = router;



