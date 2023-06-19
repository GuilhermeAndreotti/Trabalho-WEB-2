const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, idade, email, senha } = req.body;
    const criptosenha = await bcrypt.hash(senha, 10);

    const token = await usuariobd.cadastrarUsuario(
      nome,
      idade,
      email,
      criptosenha
    );
    req.session.token = token;
    res.json(token);
  } catch (error) {
    res.status(500).send({ error: "Erro ao cadastrar usuário." });
  }
});

router.post("/logar", async (req, res) => {
  
  try {  
    const { email, senha } = req.body;
    const usuario = await usuariobd.logarUsuario(email, senha);

    const token = jwt.sign(
      { usuario: usuario.dataValues }, process.env.permissaojwt,{ expiresIn: "1h" }
    );

    if (token === null) {
      res.status(404).send({ error: "Usuário não encontrado ou senha incorreta." });
      return null;
    } else
    {
      req.session.usuario = usuario;
      req.session.token = token;
      res.json(token);
    }
    
  } catch (error) {
    res.status(500).send({ error: "Erro ao logar com o usuário." });
    return null;
  }
});

module.exports = router;
