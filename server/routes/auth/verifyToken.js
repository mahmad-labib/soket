const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const accessTokenSecret = 'hjnshfb$%&#%^HDFSHGAERgad';

async function auth(req, res, next) {
    const token = req.cookies.token;
    try {
        const verfied = jwt.verify(token, accessTokenSecret)
        const checkUser = await User.findOne({ email: verfied.email });
        if (!checkUser) return res.redirect('/logout');
        req.user = checkUser;
        next()
    } catch (error) {
        res.redirect('/logout');
    }
};

module.exports = auth;