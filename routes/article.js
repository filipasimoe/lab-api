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

router.put('/edit', (request, result) => {
    let IDA = request.body.IDA;
    let month = request.body.month;
    let year = request.body.year;
    let url = request.body.url;
    let authors = request.body.authors;
    let context = request.body.context;
    let title = request.body.title;

    // Gets all the original information
    let getInfo = "SELECT * from articles WHERE IDA='" + IDA + "';";

    db.query(getInfo, (err, infoRes) => {
        if(err) throw err;

        if(infoRes.length == 0) {
            result.status(404).send({
                "message": "article not found"
            });
        }
        else {
            // If any of the information comes back empty, it's replaced by the original information
            if(month == null || month == '') month = infoRes[0].month;
            if(year == null || year == '') year = infoRes[0].year;
            if(url == null || url == '') url = infoRes[0].url;
            if(authors == null || authors == '') authors = infoRes[0].authors;
            if(context == null || context == '') context = infoRes[0].context;
            if(title == null || title == '') title = infoRes[0].title;

            let update = "UPDATE `articles` SET `title`='" + title + "',`month`='" + month + "',`year`='" + year + "',`url`='" + url + "',`authors`='" + authors + "',`context`='" + context + "' WHERE IDA='" + IDA + "';";

            db.query(update, (err, updateRed) => {
                if(err) throw err;

                result.status(200).send({
                    "message": "updated"
                }); 
            });
        }
    }); 
});

/*  Returns the information for one publication
    Receives email
*/
router.get('/info/:IDA', (request, result) => {
    let IDA = request.params.IDA;

    let getInfo = "SELECT * FROM articles WHERE IDA='" + IDA + "';";

    db.query(getInfo, (err, getRes) => {
        if(err) throw err;

        // If the IDA doesn't exist, returns Get = 0
        if(getRes.length == 0) {
            result.status(400).send({
                "message": "article doens't exist"
            });      
        }
        else {
            result.status(200).send({
                "IDA": getRes[0].IDA,
                "IDR": getRes[0].IDR,
                "title": getRes[0].title,
                "month": getRes[0].month,
                "year": getRes[0].year,
                "url": getRes[0].url,
                "context": getRes[0].context,
                "authors": getRes[0].authors
            });
        }
    });
        
});

router.get('/from/:IDU', (request, result) => {
    let IDU = request.params.IDU;
    let getIDR = "SELECT * FROM researchers, users WHERE researchers.IDU = '" + IDU + "';";

    db.query(getIDR, (err, getRes) => {
        if(err) throw err;

        if(getRes.length == 0) {
            result.status(400).send({
                "message": "researcher not found"
            });      
        }
        else {
            console.log(getRes[0].IDR)
            let info = "SELECT * FROM articles WHERE IDA=(SELECT IDA FROM articleresearchers WHERE articleresearchers.IDR = '" + getRes[0].IDR + "');"
        
            db.query(info, (err, infoRes) => {
                result.status(200).send(infoRes);
            })
        }
    });
});

/*  Returns all articles
    Receives email
*/
router.get('/all', (request, result) => {
    let getInfo = "SELECT articles.*, researchers.IDU FROM articles, articleresearchers, researchers WHERE articleresearchers.IDA = articles.IDA AND articleresearchers.IDR=researchers.IDR;";

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
router.delete('/delete/:id', (request, result) => {
    let IDA = request.params.id;

    let getInfo = "SELECT * FROM articles WHERE IDA='" + IDA + "';";

    db.query(getInfo, (err, infoRes) => {
        if(err) throw err;

        if(infoRes.length == 0) {
            result.status(404).send({
                "message": "article not found"
            });
        }
        else {
            let delete1 = "DELETE FROM articleresearchers WHERE IDA='" + IDA + "';";

            db.query(delete1, (err, d1Res) => {
                if(err) throw err;

                let delete2 = "DELETE FROM `articles` WHERE IDA='" + IDA + "';";

                db.query(delete2, (err, d2Res) => {
                    if(err) throw err;

                    result.status(200).send({
                        "message": "deleted"
                    });
                });
            });
        }
    });
});

module.exports = router;