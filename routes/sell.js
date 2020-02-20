const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); 
const Product = require('../models/product');
const Fproduct = require('../models/fproducts');

//multer setup
var multer = require("multer")

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

var upload = multer({storage: storage});

router.get('/sell', isLoggedIn, (req, res, next) => {
    res.render('sell',{title: 'Home|Sell', success: req.session.success,  errors: req.session.errors});
    req.session.success = null;
    req.session.errors = null;
})



router.post('/book_upload', isLoggedIn, upload.single('image_path'), (req, res, next) => {
    req.check('name')
     .isLength({min:3}).withMessage('Name must be of 3 characters long.')
     .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.');
    req.check('phone')
     .isNumeric().withMessage('Phone number must be numeric.')
     .isLength({min:10,max:10}).withMessage('Phone number must be of 10 digits.');
    req.check('book_name')
     .isLength({min:3}).withMessage('Book Name must be of 3 characters long.')
     .matches(/^[A-Za-z\s]+$/).withMessage('Book Name must be alphabetic.');
    req.check('price')
     .isNumeric().withMessage('Phone number must be numeric.')
     .isLength({min: 2}).withMessage('Price should be greater than 10.');
    req.check('description')
     .isLength({min:3}).withMessage('Description must be of 3 characters long.')
     .matches(/^[<A-Za-z0-9></A-Za-z0-9>\s]+$/).withMessage('Please write appropriate description.')
    
    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
        const tempArray = [];
        const facultyArray = ['bct', 'bce', 'bexbei', 'bge', 'bme', 'bel', 'bam']
        Object.keys(req.body).map((item, index) => {
            if(facultyArray.includes(item)){
                tempArray.push(item);
            }
        });
        const facultyString = tempArray.join(',');
        // console.log(facultyString)
        var item = {
            name: req.body.name,
            phone: req.body.phone,
            book_name: req.body.book_name,
            image_path: req.file.filename,
            price: req.body.price,
            description: req.body.description,
            faculty: facultyString
        };
        var data = new Fproduct(item);
        data.save()
    }
    res.redirect('/sell');
})


function isLoggedIn (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please Login Or Signup to Continue');
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}


module.exports = router;