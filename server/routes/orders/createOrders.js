const express = require('express')
const router = express.Router();
const Order = require('../../models/order')
const User = require('../../models/user')

router.get('/', async (req, res) => {
    // const data = await User.findById(req.user._id).populate('orders', 'title')
    // console.log(data);
    res.render('pages/createOrders', { user: req.user })
});

router.post('/', async (req, res) => {
    const order = new Order({
        title: req.body.title,
        description: req.body.description,
        creator: req.user._id
    });

    try {
        const saveOrder = await order.save();
        const update = await User.updateOne({ _id: req.user._id }, { $push: { orders: [{ _id: saveOrder._id }] } })
        res.redirect('viewOrders');
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
