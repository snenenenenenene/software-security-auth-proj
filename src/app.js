var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
const serverless = require('serverless-http');
 
 
var mysql = require('mysql');
var connection  = require('../lib/db');
 
 
var indexRouter = require('../routes/index');
var authRouter = require('../routes/auth');
 
var app = express();
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
 
app.use(session({ 
    secret: 'fdsfdsifjspfjpgopg4398938y389yg9hfidog',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use('/.netlify/functions/api', router);
 

app.use(expressValidator());
 
app.use('/', indexRouter);

app.use('/auth', authRouter);
 
app.use(function(req, res, next) {
  next(createError(404));
});
 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(3000); 
module.exports = app;
module.exports.handler = serverless(app); 