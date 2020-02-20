var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
// var Fproduct = require('../models/fproducts');


router.get('/', (req, res, next) => {
  var messages = req.flash('success');
  Product.find((err, docs)=>{
    res.render('index', {title: 'Ioebooks | Home', products1: docs, products2: docs, messages: messages});
    }) 
  })

  router.get('/bct', (req, res, next) => {
    var messages = req.flash('success');
    Product.find((err, docs)=>{
      const splitedArray = [];
      const documents = [];
      docs.forEach((item, index) =>  {
        splitedArray.push(item.faculty.split(','))
        documents.push(item);
      });
      const bctDocs = []
      for(let el of splitedArray){
        if(el.includes('bct')){
          const requiredIndex = splitedArray.indexOf(el);
          bctDocs.push(docs[requiredIndex]);
        }
      }
      res.render('index', {title: 'Ioebooks | BCT ', products1: documents, products2: bctDocs, messages: messages});
      }) 
    })
  router.get('/bce', (req, res, next) => {
    var messages = req.flash('success');
    Product.find((err, docs)=>{
      const splitedArray = [];
      const documents = [];
      docs.forEach((item, index) =>  {
        splitedArray.push(item.faculty.split(','))
        documents.push(item);
      });
      const bctDocs = []
      for(let el of splitedArray){
        if(el.includes('bce')){
          const requiredIndex = splitedArray.indexOf(el);
          bctDocs.push(docs[requiredIndex]);
        }
      }
      res.render('index', {title: 'Ioebooks | BCE', products1: documents, products2: bctDocs, messages: messages});
      }) 
    })
router.get('/bexbei', (req, res, next) => {
var messages = req.flash('success');
Product.find((err, docs)=>{
  const splitedArray = [];
  const documents = [];
  docs.forEach((item, index) =>  {
    splitedArray.push(item.faculty.split(','))
    documents.push(item);
  });
  const bctDocs = []
  for(let el of splitedArray){
    if(el.includes('bexbei')){
      const requiredIndex = splitedArray.indexOf(el);
      bctDocs.push(docs[requiredIndex]);
    }
  }
  res.render('index', {title: 'Ioebooks | BEXBEI', products1: documents, products2: bctDocs, messages: messages});
  }) 
})
router.get('/bel', (req, res, next) => {
  var messages = req.flash('success');
  Product.find((err, docs)=>{
    const splitedArray = [];
    const documents = [];
    docs.forEach((item, index) =>  {
      splitedArray.push(item.faculty.split(','))
      documents.push(item);
    });
    const bctDocs = []
    for(let el of splitedArray){
      if(el.includes('bel')){
        const requiredIndex = splitedArray.indexOf(el);
        bctDocs.push(docs[requiredIndex]);
      }
    }
    res.render('index', {title: 'Ioebooks | BEL', products1: documents, products2: bctDocs, messages: messages});
    }) 
  })
  router.get('/bge', (req, res, next) => {
    var messages = req.flash('success');
    Product.find((err, docs)=>{
      const splitedArray = [];
      const documents = [];
      docs.forEach((item, index) =>  {
        splitedArray.push(item.faculty.split(','))
        documents.push(item);
      });
      const bctDocs = []
      for(let el of splitedArray){
        if(el.includes('bge')){
          const requiredIndex = splitedArray.indexOf(el);
          bctDocs.push(docs[requiredIndex]);
        }
      }
      res.render('index', {title: 'Ioebooks | BGE', products1: documents, products2: bctDocs, messages: messages});
      }) 
    })
  router.get('/bme', (req, res, next) => {
    var messages = req.flash('success');
    Product.find((err, docs)=>{
      const splitedArray = [];
      const documents = [];
      docs.forEach((item, index) =>  {
        splitedArray.push(item.faculty.split(','))
        documents.push(item);
      });
      const bctDocs = []
      for(let el of splitedArray){
        if(el.includes('bme')){
          const requiredIndex = splitedArray.indexOf(el);
          bctDocs.push(docs[requiredIndex]);
        }
      }
      res.render('index', {title: 'Ioebooks | BME', products1: documents, products2: bctDocs, messages: messages});
      }) 
    })
  router.get('/bam', (req, res, next) => {
    var messages = req.flash('success');
    Product.find((err, docs)=>{
      const splitedArray = [];
      const documents = [];
      docs.forEach((item, index) =>  {
        splitedArray.push(item.faculty.split(','))
        documents.push(item);
      });
      const bctDocs = []
      for(let el of splitedArray){
        if(el.includes('bam')){
          const requiredIndex = splitedArray.indexOf(el);
          bctDocs.push(docs[requiredIndex]);
        }
      }
      res.render('index', {title: 'Ioebooks | BAM', products1: documents, products2: bctDocs, messages: messages});
      }) 
    })

router.get('/single-product/:id', (req, res, next) => {
  var productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) {
      console.log('error in rendering');
    }
    res.render('single-product', {product: product});
  })
})

router.get('/add-to-cart/:id', (req, res, next) => {
   var productId = req.params.id;
   var cart = new Cart(req.session.cart ? req.session.cart: {});
    Product.findById(productId, (err, product) => {
     if (err) {
          return res.redirect('/');
     }
     cart.add(product, product.id);
     req.session.cart = cart;
     res.redirect('/');
   })

})

router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart){
    return res.render('cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('cart',{products: cart.generateArray(), totalPrice: cart.totalPrice})
})

router.get('/remove/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart? req.session.cart: {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
})

router.get('/checkout', isLoggedIn, (req, res, next) => {
  if (!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('checkout', {products: cart.generateArray(), totalPrice: cart.totalPrice,  success: req.session.success,  errors: req.session.errors});
  req.session.success = null;
  req.session.errors = null;
})


router.post('/checkout', isLoggedIn, (req, res, next) => {

  if (!req.session.cart){
    return res.redirect('/shopping-cart');
  }

  req.check('name')
    .isLength({min:3}).withMessage('Name must be of 3 characters long.')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.');
  req.check('phone')
    .isLength({min:10,max:10}).withMessage('Phone number must be of 10 digits.');
  
    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/checkout');
    } else {
      var cart = new Cart(req.session.cart);
      var order = new Order({
        user: req.user,
        cart: cart,
        name: req.body.name.join(),
        address: req.body.address.join(),
        phone: req.body.phone
      })

      order.save((err, result) => {
        if (err) {
          return res.redirect('/checkout');
        }
        req.flash('success', 'Your Order is placed.');
        req.session.cart = null;
        res.redirect('/orderdone');
      })
  }
})

function isLoggedIn (req, res, next){
  if (req.isAuthenticated()){
      return next();
  }
  req.flash('error', 'Please Login to Continue');
  req.session.oldUrl = req.url;
  res.redirect('/user/login');
}

module.exports = router;
