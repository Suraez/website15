const express = require('express');
const router =  express.Router();

router.get('/about', (req, res, next) => {
    res.render('about');
})
router.get('/error', (req, res, next) => {
    res.render('error');
})

router.get('/contact', (req, res, next) => {
    res.render('contact');
})

router.get('/orderdone', (req, res, next) => {
    res.render('orderdone');
})
module.exports = router;