const express = require('express');
const router =  express.Router();
var csrf = require('csurf');
var passport = require('passport');

var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart')
function notLoggedIn (req, res, next){
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}


function isLoggedIn (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

var csrfProtection = csrf();    
router.use(csrfProtection);



router.get('/profile', isLoggedIn, (req, res, next) => {
    Order.find({user: req.user}, (err, orders) => {
        if (err) return res.write('Error!')
        var cart;
        orders.forEach((order) => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        })
        res.render('profile', {orders: orders })
    })
})



router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
})



router.use('/', notLoggedIn, (req, res, next) => {
    next();
})

router.get('/login',(req, res, next) => {
    var messages = req.flash('error');
    res.render('myaccount', {messages: messages, csrfToken: req.csrfToken()});
})

router.get('/signup',(req, res, next) => {
    var messages = req.flash('error');
    res.render('myaccount', {messages: messages, csrfToken: req.csrfToken()});
})

router.get('/account',(req, res, next) => {
    var messages = req.flash('error');
    res.render('myaccount', {messages: messages, csrfToken: req.csrfToken()});
})

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl){
        var old = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(old);
    } else {
        res.redirect('/user/profile'); 
    }
})

router.post('/login', passport.authenticate('local.login',{
    failureRedirect: '/user/login',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl){
        var old = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(old);
    } else {
        res.redirect('/user/profile'); 
    }
})

module.exports = router;