const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();

router.post('/cadastrar', async (req, res) => {
    try {
        const { nome, idade, email, senha } = req.body;
        const token = await usuariobd.cadastrarUsuario(nome, idade, email, senha);
        res.json(token)

    } catch (error) {
      res.status(500).send({ error: 'Erro ao cadastrar usuário.' });
    }
});
  
module.exports = router;
