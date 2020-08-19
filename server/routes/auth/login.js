const express = require('express')
const router = express.Router();
const User = require('../../models/user');
var jwt = require('jsonwebtoken');

const accessTokenSecret = 'hjnshfb$%&#%^HDFSHGAERgad';


router.get('/', (req, res) => {
    try {
        const token = req.cookies.token;
        const verfied = jwt.verify(token, accessTokenSecret);
        if (verfied) return res.redirect('/')
    } catch (error) {
        res.clearCookie("token");
        res.render('pages/login');
    }
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (!user) return res.render('pages/login', { msg: 'please signup first' });
    console.log(user);
    const token = jwt.sign({ email: user.email }, accessTokenSecret);

    res.cookie('token', token);
    res.redirect('/');
});

module.exports = router;