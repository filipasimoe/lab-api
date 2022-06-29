const router = require('express').Router();
const user = require('../model/user');
const verify = require ('./verifyToken');

router.get('/', verify, (req, res) => {
    res.send(req.user);
});

module.exports = router;