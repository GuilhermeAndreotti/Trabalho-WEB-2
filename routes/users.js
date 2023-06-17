const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const bcrypt = require('bcryptjs');

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
    const token = await usuariobd.logarUsuario(email, senha);

    req.session.token = token
    res.json(token)
  
  } catch (error) {
    res.status(500).send({ error: "Erro ao logar com o usuário." });
  }

});

module.exports = router;
