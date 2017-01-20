var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('basic-auth');
var throttle = require("express-throttle");

var routes = require('./routes/index');
var app = express();

var mongoose = require('mongoose');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
mongoose.connect("mongodb://localhost/JsonMartDB", (err) => {
  //to-do, re-factor it. App should react accordingly, when Mongo is up/down
  if (err) {
    console.error(err);
    logs.info(err);

    //don't exit node.js. Keep running it
    //process.exit();
  }
});
*/

function Authorize(req, res, next) {
  var credentials = auth(req);
  //Data save can be done into the DB
  if (!credentials || credentials.name !== 'rakesh' || credentials.pass !== 'Rakesh@@123') {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="secureDoor"');
    res.end('Access denied');
  } else {
    next();
  }
}

//app.use('/v1/api/doc', Authorize, throttle({ "rate": "5/s" }), routes);

app.use('/v1/api/doc', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
       .send('error', { message: err.message, error: err });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  //log error using Winstone
  res.status(err.status || 500)
     .send('error', {message: err.message, error: {} });
});

app.listen(8080, () => {
  console.log("App is running");
});

module.exports = app;
