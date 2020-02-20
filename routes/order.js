const express = require('express');
const router =  express.Router();
const Order = require('../models/order');

router.get('/all', (req, res, next) => {
    Order.find((err, docs) => {
        if (err){
            return res.send('error in fetching orders, go to db.')
        }
        res.send(docs);
    })
})

router.get('/delete/:id', (req, res, next) => {
    var id =  req.params.id;
    // Order.findByIdAndRemove(id).exec();
    // res.redirect('/ordee/all');
    Order.findOneAndDelete({_id:id}, (err,docs) => {
        if (err){
            return res.send('error in deleting.')
        }
        res.redirect('/ordee/all');
    })
})
module.exports = router;