const router = require('express').Router();
const verify = require ('./verifyToken');
const mySQL = require('mysql');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

// Add project to db. Returns Insert = 1 if successfull, Insert = 0 if not successfull
router.post('/add', verify, (request, result) => {
    let title = request.body.title;
    let duration = request.body.duration;
    let context = request.body.context;
    let description = request.body.description;
    let role = request.body.role;
    let year = request.body.year;
    let email = request.body.email;

    // Get IDu from email
    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;

        // If the email doesn't exist, returns Delete = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "Insert": 0
            });      
        }

        // Get IDR from IDU
        let getIDR = "SELECT IDR from researchers WHERE IDU='" + iRes[0].IDU + "';";

        db.query(getIDR, (err, idrRes) => {
            if(err) throw err;

            // If the IDR doesn't exist, returns Delete = 0
            if(idrRes.length == 0) {
                result.status(400).send({
                    "Insert": 0
                });      
            }

            let insert = "INSERT INTO `projects`(`IDR`, `title`, `duration`, `context`, `description`, `role`, `year`) VALUES ('" + idrRes[0].IDR + "','" + title + "','" + duration +"','" + context + "','" + description + "','" + role + "','" + year + "');";

            db.query(insert, (err, insertRes) => {
                if(err) throw err;
        
                result.status(200).send({
                    "Insert": 1
                }); 
            }); 
        });    
    });
});

/*  Updates project info
    Returns Update = 1 if successfull, Update = 0 if not successfull
*/
router.put('/edit', verify, (request, result) => {
    let title = request.body.title;
    let duration = request.body.duration;
    let context = request.body.context;
    let description = request.body.description;
    let role = request.body.role;
    let year = request.body.year;
    let IDP = request.body.IDP;

    let update = "UPDATE `projects` SET `title`='" + title + "',`duration`='" + duration + "',`context`='" + context + "',`description`='" + description + "',`role`='" + role + "',`year`='" + year + "' WHERE IDP='" + IDP + "';";

    db.query(update, (err, updateRes) => {
        if(err) throw err;

        result.status(200).send({
            "Update": 1
        }); 
    });
});

/*  Returns the information for one project
    Receives email
*/
router.get('/info/:IDP', verify, (request, result) => {
    let IDP = request.params.IDP;

    let getInfo = "SELECT * FROM projects WHERE IDP='" + IDP + "';";

    db.query(getInfo, (err, getRes) => {
        if(err) throw err;

        // If the IDP doesn't exist, returns Get = 0
        if(getRes.length == 0) {
            result.status(400).send({
                "Get": 0
            });      
        }

        result.status(200).send({
            "IDP": getRes[0].IDP,
            "IDR": getRes[0].IDR,
            "title": getRes[0].title,
            "duration": getRes[0].duration,
            "context": getRes[0].context,
            "description": getRes[0].description,
            "role": getRes[0].role,
            "year": getRes[0].year
        });

    });
});

/*  Returns all projects
*/
router.get('/all', verify, (request, result) => {
    let getInfo = "SELECT * FROM projects;";

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
    let IDP = request.body.IDP;

    let deleteInfo = "DELETE FROM `projects` WHERE IDP='" + IDP + "';";

    db.query(deleteInfo, (err, deleteRes) => {
        if(err) throw err;

        result.status(200).send({
            "Delete": 1
        });

    });
});

module.exports = router;

