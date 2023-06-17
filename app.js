var express = require('express');
var path = require('path');
const bcrypt = require("bcryptjs");
var app = express();
var session = require('express-session');
require('dotenv').config();

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);
const jwt = require('jsonwebtoken')

var apiUsers = require('./routes/users');
var paginas = require('./routes/index');
var paginasp = require('./routes/rotasprotegidas');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'mustache');

app.use(session({
    secret: process.env.chavesecreta,
    resave: false,
    saveUninitialized: false,
}));

app.use('/', paginas);
app.use('/apiUsers', apiUsers);
app.use('/main', paginasp);

module.exports = app;
