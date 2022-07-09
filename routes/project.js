const router = require('express').Router();
const verify = require ('./verifyToken');
const mySQL = require('mysql');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

// Add project to db. 
router.post('/add', (request, result) => {
    let title = request.body.title;
    let duration = request.body.duration;
    let context = request.body.context;
    let description = request.body.description;
    let year = request.body.year;
    let email = request.body.email;

    // Get IDu from email
    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;

        // If the email doesn't exist, returns Delete = 0
        if(iRes.length == 0) {
            result.status(400).send({
                "message": "email doesn't exist"
            });      
        }

        // Get IDR from IDU
        let getIDR = "SELECT IDR from researchers WHERE IDU='" + iRes[0].IDU + "';";

        db.query(getIDR, (err, idrRes) => {
            if(err) throw err;

            // If the IDR doesn't exist, returns Delete = 0
            if(idrRes.length == 0) {
                result.status(400).send({
                    "message": "researcher doesn't exist"
                });      
            }
            else {

                let isTitle = "SELECT * FROM projects WHERE title='" + title + "';"

                db.query(isTitle, (err, isTitleRes) => {
                    if(err) throw err;

                    if(isTitleRes.length > 0) {
                        result.status(400).send({
                            "message": "there's already a project with that name"
                        }); 
                    }
                    else {
                        let insert = "INSERT INTO `projects`(`title`, `duration`, `context`, `description`, `year`) VALUES ('" + title + "','" + duration +"','" + context + "','" + description + "','" + year + "');";
            
                        db.query(insert, (err, insertRes) => {
                            if(err) throw err;
            
                            let getIDP = "SELECT IDP FROM projects WHERE title='" + title + "';"
            
                            db.query(getIDP, (err, idpRes) => {
                                if(err) throw err;
            
                                if(idpRes.length == 0) {                       
                                    result.status(400).send({
                                        "message": "error"
                                    }); 
                                }
                                else {
                                    let insert = "INSERT INTO `projectresearchers`(`IDR`, `IDP`) VALUES ('" + idrRes[0].IDR + "','" + idpRes[0].IDP + "')";
            
                                    db.query(insert, (err, idprRes) => {
                                        if(err) throw err;
            
                                        result.status(200).send({
                                            "message": "project inserted"
                                        }); 
                                    }); 
                                }
                            });                 
                        }); 
                    }
                });                
            }
        });    
    });
});

/*  Updates project info
    Returns Update = 1 if successfull, Update = 0 if not successfull
*/
router.put('/edit', (request, result) => {
    let title = request.body.title;
    let duration = request.body.duration;
    let context = request.body.context;
    let description = request.body.description;
    let year = request.body.year;
    let IDP = request.body.IDP;

    let update = "UPDATE `projects` SET `title`='" + title + "',`duration`='" + duration + "',`context`='" + context + "',`description`='" + description + "',`year`='" + year + "' WHERE IDP='" + IDP + "';";

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
router.get('/info/:IDP', (request, result) => {
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
            "year": getRes[0].year
        });

    });
});

/*  Returns all projects
*/
router.get('/all', (request, result) => {
    let getInfo = " SELECT projects.*, projectresearchers.IDR, researchers.name, users.email FROM projects, projectresearchers, researchers, users WHERE projects.IDP=projectresearchers.IDP AND projectresearchers.IDR = researchers.IDR AND researchers.idu=users.IDU;";

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