const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/principal', function(req, res, next){
    res.render('principal',{ token: req.query.token});
});

router.get('/meuperfil', function(req, res, next){
  res.render('meuperfil', { token: req.query.token, usuario: req.usuario });
});


module.exports = router;