const router = require('express').Router();
const verify = require ('./verifyToken');
const mySQL = require('mysql');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

// Add researcher to db. Returns Insert = 1 if successfull, Insert = 0 if not successfull
router.post('/add', verify, (request, result) => {
    let name = request.body.name;
    let photo = request.body.photo;
    let bio = request.body.bio;
    let email = request.body.email;

    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;
        // If the email doesn't exist, returns IDU = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "Insert": 0
            });      
        }
        else {
            let insert = "INSERT INTO `researchers`(`IDU`, `name`, `photo`, `bio`) VALUES ('" + iRes[0].IDU + "','" + name + "','" + photo + "','" + bio + "');";

            db.query(insert, (err, insertRes) => {
                if(err) throw err;

                result.status(200).send({
                    "Insert": 1
                }); 
            });
        }

    });
    
});

/*  Updates researcher info
    Receives name, photo, bio, email
    Email can't be changed
    Returns Update = 1 if successfull, Update = 0 if not successfull
*/
router.put('/edit', verify, (request, result) => {
    let name = request.body.name;
    let photo = request.body.photo;
    let bio = request.body.bio;
    let email = request.body.email;

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
            let update = "UPDATE `researchers` SET `name`='" + name + "',`photo`='" + photo + "',`bio`='" + bio + "' WHERE IDU='" + iRes[0].IDU + "';"

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
router.get('/info/:email', verify, (request, result) => {
    let email = request.params.email;

    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;
        // If the email doesn't exist, returns IDU = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "Get": 0
            });      
        }
        else {
            let getInfo = "SELECT * FROM researchers WHERE IDU='" + iRes[0].IDU + "';";

            db.query(getInfo, (err, getRes) => {
                if(err) throw err;

                // If the email doesn't exist, returns Get = 0
                if(getRes.length == 0) {
                    result.status(400).send({
                        "Get": 0
                    });      
                }

                result.status(200).send({
                    "IDR": getRes[0].IDR,
                    "IDU": getRes[0].IDU,
                    "name": getRes[0].name,
                    "photo": getRes[0].photo,
                    "bio": getRes[0].bio
                });

            });
        }

    });
    
});

/*  Returns all researchers
*/
router.get('/all', verify, (request, result) => {
    let getInfo = "SELECT * FROM researchers;";

    db.query(getInfo, (err, getRes) => {
        if(err) throw err;

        console.log(getRes.length);
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
router.delete('/delete', verify, (request, result) => {
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

