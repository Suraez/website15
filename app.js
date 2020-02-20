var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs =  require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb+srv://suraj21:suraj21@firstdatabase-ytrfr.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log('Connected to the database'))
  .catch(err=> console.log('could not connect.',err.message))


 
// passport
require('./config/passport');

  // extra router is made at the top from the bottom
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var sellRouter = require('./routes/sell');
var extraRouter = require('./routes/extra');
var pdfRouter = require('./routes/pdf');
var orderRouter = require('./routes/order');

var app = express();


  
// view engine setup

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs');
// all the updates in views
var hbs = expressHbs.create({});

hbs.handlebars.registerHelper('increasePrice', function(price){
  price+=20;
  return price;
})

hbs.handlebars.registerHelper('update', function(strinn){
  var s = "/uploads/";
  var ss = s+strinn;
  return ss;
})

hbs.handlebars.registerHelper('markedPrice', function(price){
  price*=2;
  return price;
})


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session({
  secret: 'blahblah',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 120 * 60 * 1000}
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/', sellRouter);
app.use('/', extraRouter); // extra router is made at the second from the bottom
app.use('/', indexRouter);
app.use('/pdf', pdfRouter);
app.use('/user', userRouter);
app.use('/ordee', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
  