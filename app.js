var express = require('express');
var path = require('path');
var app = express();

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

// Rotas
var paginas = require('./routes/index');
//var propostaRouter = require('./routes/proposta');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'mustache');

app.use('/', paginas);
//app.use('/proposta', propostaRouter)

module.exports = app;
