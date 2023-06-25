const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/principal', function(req, res, next){
    res.render('principal',{ token: req.query.token, usuario: req.usuario.id });
});

router.get('/meuperfil', function(req, res, next){
  res.render('meuperfil', { token: req.query.token, usuario: req.usuario });
});

router.get('/cadastrarjogo', function(req, res, next){
  res.render('cadastrojogo',{ token: req.query.token, usuario: req.usuario.id});
});

router.get('/cadastrartreino', function(req, res, next){
  res.render('cadastrotreino',{ token: req.query.token, usuario: req.usuario.id});
});




module.exports = router;