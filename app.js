var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();

app.engine("mustache", engine);
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(__dirname + '/public'));
app.set('view engine', 'mustache');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(function(req, res, next) {next(createError(404));});
require('dotenv').config();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

});

module.exports = app;
