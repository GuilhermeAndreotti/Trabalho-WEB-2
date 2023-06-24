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
var apiJogos = require('./routes/jogos');
var paginas = require('./routes/index');
var paginasp = require('./routes/rotasprotegidas');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'mustache');

const validaLogin = (req, res, next) => {       
    let token = req.query.token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ errors: 'Token não fornecido' });
    }
    jwt.verify(token, process.env.permissaojwt, (error, decoded) => {
      if (!error) {
          req.usuario = decoded.usuario
          return next()
      } else {
          res.redirect("/")
      }
    })   
};

app.use('/', paginas);
app.use('/apiUsers', validaLogin, apiUsers);
app.use('/apiJogos',validaLogin, apiJogos);
app.use('/swordplay', validaLogin, paginasp);


module.exports = app;
