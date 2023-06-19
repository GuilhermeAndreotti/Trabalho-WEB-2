const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();

const validaLogin = (req, res, next) => {
    if (req.session.token) {
      return next();
    }else{
      res.redirect('/');
    }
};

router.get('/principal', validaLogin, function(req, res, next){
    res.render('principal');
});

router.get('/', function(req, res, next){
    res.render('login');
});

router.get('/meuperfil', validaLogin, function(req, res, next){
  const usuario = req.session.usuario;
  res.render('meuperfil', { usuario });
});

module.exports = router;