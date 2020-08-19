const express = require('express')
const router = express.Router();
const createOrders = require('./orders/createOrders');
const viewOrders = require('./orders/viewOrders');
const login = require('./auth/login');
const register = require('./auth/register');
const verify = require('./auth/verifyToken');

router.get('/', verify, (req, res) => {
    res.render('home', { user: req.user });
});

router.use('/createOrders', verify, createOrders);
router.use('/viewOrders', verify, viewOrders);
router.use('/login', login);
router.use('/register', register);

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('login');
})

module.exports = router;

