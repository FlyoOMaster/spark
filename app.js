var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessionOpts = require('./config').Session;
var HttpError = require('./error').HttpError,
    AuthError = require('./error').AuthError;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: sessionOpts.secret,
  resave: sessionOpts.resave,
  saveUninitialized: sessionOpts.saveUninitialized,
  cookie: sessionOpts.cookie,
  store:sessionOpts.store
}));

//middleware
app.use(require('./middleware/sendHttpError'));


///Routes
require('./routes/index')(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var test = app.get('env');
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    if(typeof err == 'number'){
      err = new HttpError(err);
    }
    if(err instanceof HttpError){
      return res.sendHttpError(error);
    }
    if(err instanceof  AuthError){
      return res.sendHttpError(err)
    }
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  if (app.get('env') === 'development') {
    if(typeof err == 'number'){
      err = new HttpError(err);
    }
    if(err instanceof HttpError){
      return res.sendHttpError(err);
    }
    if(err instanceof  AuthError){
      return res.sendHttpError(err)
    }
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// production error handler
// no stacktraces leaked to user




module.exports = app;
