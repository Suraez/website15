const express = require('express');
const router =  express.Router();


router.get('/bct', (req, res) => {
    res.render('computer');
})

router.get('/bel', (req, res) => {
    res.render('electrical');
})

router.get('/bexbei', (req, res) => {
    res.render('electronics');
})

router.get('/bexbei', (req, res) => {
    res.render('electronics');
})

router.get('/bme', (req, res) => {
    res.render('mechanical');
})

router.get('/bce', (req, res) => {
    res.render('civil');
})


router.get('/bam', (req, res) => {
    res.render('automobiles');
})

router.get('/sciencefiction', (req, res) => {
    res.render('sciencefiction');
})

router.get('/nonfiction', (req, res) => {
    res.render('nonfiction');
})
router.get('/love', (req, res) => {
    res.render('love');
})
module.exports = router;
