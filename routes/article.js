const router = require('express').Router();
const verify = require ('./verifyToken');
const mySQL = require('mysql');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

// Add article to db.
router.post('/add', (request, result) => {
    let title = request.body.title;
    let month = request.body.month;
    let year = request.body.year;
    let url = request.body.url;
    let authors = request.body.authors;
    let email = request.body.email;
    let context = request.body.context;

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
                let isTitle = "SELECT * FROM articles WHERE title='" + title + "';"

                db.query(isTitle, (err, isTitleRes) => {
                    if(err) throw err;

                    if(isTitleRes.length > 0) {
                        result.status(400).send({
                            "message": "there's already a publication with that name"
                        }); 
                    }

                    else {
                        let insert = "INSERT INTO `articles`(`title`, `month`, `year`, `url`, `authors`, `context`) VALUES ('" + title  + "','" + month  + "','" + year  + "','" + url  + "','" + authors  + "','" + context  + "')"
                    
                        db.query(insert, (err, insertRes) => {
                            if(err) throw err;
                            
                            let getIDA = "SELECT IDA FROM articles WHERE title='" + title + "';"

                            db.query(getIDA, (err, idaRes) => {
                                if(err) throw err;

                                if(idaRes.length == 0) {
                                    result.status(400).send({
                                        "message": "error"
                                    }); 
                                }
                                else {
                                    let insert = "INSERT INTO `articleresearchers`(`IDR`, `IDA`) VALUES ('" + idrRes[0].IDR + "','" + idaRes[0].IDA + "')";

                                    db.query(insert, (err, insertRes) => {
                                        if(err) throw err;
                                
                                        result.status(200).send({
                                            "message": "article inserted!"
                                        }); 
                                    }); 
                                }
                            });
                        });
                    }
                })
            }
        });    
    });
});

/*  Updates researcher info
    Receives name, photo, bio, ida
*/

/*
router.put('/edit', verify, (request, result) => {
    let title = request.body.title;
    let month = request.body.month;
    let year = request.body.year;
    let url = request.body.url;
    let authors = request.body.authors;
    let email = request.body.email;
    let context = request.body.context;

    // Get IDU from email
    let getIDU = "SELECT IDU from users WHERE email='" + email + "';";

    db.query(getIDU, (err, iRes) => {
        if(err) throw err;

        // If the email doesn't exist
        if(iRes.length == 0) {
            result.status(400).send({
                "message": "email doesn't exist"
            });      
        }

        // Get IDR from IDU
        let getIDR = "SELECT IDR from researchers WHERE IDU='" + iRes[0].IDU + "';";

        db.query(getIDR, (err, idrRes) => {
            if(err) throw err;

            // If the IDR doesn't exist
            if(idrRes.length == 0) {
                result.status(400).send({
                    "message": "researcher doesn't exist"
                });      
            }
            else {
                let isTitle = "SELECT * FROM articles WHERE title='" + title + "';"

                db.query(isTitle, (err, isTitleRes) => {
                    if(err) throw err;

                    if(isTitleRes.length == 0) {
                        result.status(400).send({
                            "message": "there's no publication with that name"
                        }); 
                    }

                    else {
                        let insert = "UPDATE `articles` SET `IDA`='" + isTitleRes[0].IDA + "',`title`='[value-2]',`month`='[value-3]',`year`='[value-4]',`url`='[value-5]',`authors`='[value-6]',`context`='[value-7]' WHERE 1;"
                    
                        db.query(insert, (err, insertRes) => {
                            if(err) throw err;
                            
                            let getIDA = "SELECT IDA FROM articles WHERE title='" + title + "';"

                            db.query(getIDA, (err, idaRes) => {
                                if(err) throw err;

                                if(idaRes.length == 0) {
                                    result.status(400).send({
                                        "message": "error"
                                    }); 
                                }
                                else {
                                    let insert = "INSERT INTO `articleresearchers`(`IDR`, `IDA`) VALUES ('" + idrRes[0].IDR + "','" + idaRes[0].IDA + "')";

                                    db.query(insert, (err, insertRes) => {
                                        if(err) throw err;
                                
                                        result.status(200).send({
                                            "Insert": 1
                                        }); 
                                    }); 
                                }
                            });
                        });
                    }
                })
            }
        });    
    });
});
*/
/*  Returns the information for one researcher
    Receives email
*/
router.get('/info/:IDA', verify, (request, result) => {
    let IDA = request.params.IDA;

    let getInfo = "SELECT * FROM articles WHERE IDA='" + IDA + "';";

    db.query(getInfo, (err, getRes) => {
        if(err) throw err;

        // If the IDA doesn't exist, returns Get = 0
        if(getRes.length == 0) {
            result.status(400).send({
                "Get": 0
            });      
        }

        result.status(200).send({
            "IDA": getRes[0].IDA,
            "IDR": getRes[0].IDR,
            "title": getRes[0].title,
            "month": getRes[0].month,
            "year": getRes[0].year,
            "url": getRes[0].url
        });

    });
        
});

/*  Returns all articles
    Receives email
*/
router.get('/all', (request, result) => {
    let getInfo = "SELECT articles.* FROM articles, articleresearchers, researchers WHERE articleresearchers.IDA = articles.IDA AND articleresearchers.IDR=researchers.IDR;";

    db.query(getInfo, (err, getRes) => {
        if(err) throw err;

        // If the IDP doesn't exist, returns Get = 0
        if(getRes.length == 0) {
            result.status(400).send({
                "Get": 0
            });      
        }

        else {
            result.status(200).send(getRes);
        }
    });
});

/*  
Deletes the information for one researcher
*/
router.delete('/delete', verify, (request, result) => {
    let IDA = request.body.IDA;

    let deleteInfo = "DELETE FROM `articles` WHERE IDA='" + IDA + "';";

    db.query(deleteInfo, (err, deleteRes) => {
        if(err) throw err;

        result.status(200).send({
            "Delete": 1
        });

    });
});

module.exports = router;

