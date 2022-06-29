const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


router.post('/register', async (req, res) => {

    //Validate data before adding user
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //Checking if user already exists in the database
    const emailExist = await User.findOne({ email: req.body.email });

    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    }
    
    catch(err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email');

    //Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');


    //Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    //res.send('Loged in');
});

module.exports = router;