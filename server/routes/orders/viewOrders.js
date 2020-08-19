const express = require('express')
const router = express.Router();
const Order = require('../../models/order')
const { multipleMongooseToObj } = require('../mongooseToObj')

router.get('/', async (req, res) => {
    const Orders = multipleMongooseToObj(await
        Order.find()
            .populate('creator', 'email')
    );
    res.render('pages/viewOrders', { Orders: Orders, user: req.user });
});

module.exports = router;