const router = require('express').Router();
const verify = require ('./verifyToken');
const mySQL = require('mysql');

const db = mySQL.createConnection({host: 'localhost', user: 'root', password: '', database: 'lab-app'});

// Add article to db. Returns Insert = 1 if successfull, Insert = 0 if not successfull
router.post('/add', verify, (request, result) => {
    let title = request.body.title;
    let month = request.body.month;
    let year = request.body.year;
    let url = request.body.url;
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

            let insert = "INSERT INTO `articles`(`title`, `month`, `year`, `url`, `IDR`) VALUES ('" + title + "','" + month + "','" + year + "','" + url + "','" + idrRes[0].IDR + "');";

            db.query(insert, (err, insertRes) => {
                if(err) throw err;
        
                result.status(200).send({
                    "Insert": 1
                }); 
            }); 
        });    
    });
});

/*  Updates researcher info
    Receives name, photo, bio, ida
    Returns Update = 1 if successfull, Update = 0 if not successfull
*/
router.put('/edit', verify, (request, result) => {
    let title = request.body.title;
    let month = request.body.month;
    let year = request.body.year;
    let url = request.body.url;
    let IDA = request.body.IDA;

    let update = "UPDATE `articles` SET `title`='" + title + "',`month`='" + month + "',`year`='" + year + "',`url`='" + url + "' WHERE IDA='" + IDA + "';"

    db.query(update, (err, updateRes) => {
        if(err) throw err;

        result.status(200).send({
            "Update": 1
        }); 
    });
});

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
router.get('/all', verify, (request, result) => {
    let getInfo = "SELECT * FROM articles;";

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

