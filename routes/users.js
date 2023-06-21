const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.put("/editar", async (req, res) => {
  try {
    const { id, nome, idade, email, senha } = req.body;
    let criptosenha = null;
    console.log('senha da rota = ' + senha);
    
    if (senha !== null && senha !== '') {
      criptosenha = await bcrypt.hash(senha, 10);
    }
    
    console.log('senha da rota = ' + criptosenha);

    const token = await usuariobd.editarUsuario(
      id,
      nome,
      idade,
      email,
      criptosenha
    );
    res.json(token);
  } catch (error) {
    res.status(500).send({ error: "Erro ao editar usuário." });
  }
});

router.delete("/:id", async (req, res) => {
    
    let { id } = req.params
    let resultado = await usuariobd.excluirUsuario(id)
    
    res.json(resultado);

});

module.exports = router;
