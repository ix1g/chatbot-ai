const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

module.exports = { router, isAuthenticated };