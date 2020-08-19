const express = require('express')
const router = express.Router();
const User = require('../../models/user');
var jwt = require('jsonwebtoken');



router.get('/', async (req, res) => {
    try {
        const token = req.cookies.token;
        const verfied = jwt.verify(token, accessTokenSecret);
        const checkUser = await User.findOne({ email: verfied.email });
        if (!checkUser) return res.redirect('/logout');
        res.clearCookie("token");
        res.render('pages/register');
    } catch (error) {
        res.clearCookie("token");
        res.render('pages/register');
    }
})

router.post('/', async (req, res) => {
    // Read username and password from request body
    const { email, password, name } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        res.render('/login', { msg: 'you are already a user' })
    } else {
        const user = new User({
            name: name,
            email: email,
            password: password
        });
        try {
            const addUser = await user.save();
            if (addUser) res.redirect('/login');
        } catch (error) {
            res.json(error);
        }
    }
});

module.exports = router;