const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jogobd = require("../models/jogobd");

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

router.get('/grafico', function(req, res, next){
  res.render('grafico',{ token: req.query.token, usuario: req.usuario.id});
});

router.get('/carga-automatica', async function(req, res, next){

    const id = req.usuario.id;

    const jogoCarga = [
      { nome: 'Kill the Killer', modalidade: 'individual', descricao: 'Jogo em que você duela contra todo mundo. Ganha quem derrotar todos'},
      { nome: 'Jogo do Rei', modalidade: 'equipe', descricao: 'Jogo em que você precisa eliminar o rei inimigo.'},
      { nome: 'Jogo do x1', modalidade: 'individual', descricao: 'Você tira um x1 com todo mundo.'},
      { nome: 'Rei Oculto', modalidade: 'equipe', descricao: 'Jogo em que você precisa eliminar o rei inimigo sem saber quem é o rei.'},
      { nome: 'Armas do Poder', modalidade: 'equipe', descricao: 'Cada equipe tem uma arma com um poder especial.'},
    ];

    for(let i = 0; i < 5; i++){
      await jogobd.cadastrarJogos(id, jogoCarga[i].nome, jogoCarga[i].modalidade, jogoCarga[i].descricao )
    }

});




module.exports = router;