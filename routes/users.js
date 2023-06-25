const express = require("express");
const usuariobd = require("../models/usuariobd");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.put("/editar", async (req, res) => {
  try {
    const { id, nome, idade, email, senha } = req.body;
    let criptosenha = null;
    
    if (senha !== null && senha !== '') {
      criptosenha = await bcrypt.hash(senha, 10);
    }
    
    const token = await usuariobd.editarUsuario(
      id,
      nome,
      idade,
      email,
      criptosenha
    );
    res.json(token);
  } catch (error) {
    res.status(500).send({ falha: "Erro ao editar usuário." });
  }
});

router.delete("/:id", async (req, res) => {
    
    let { id } = req.params
    let resultado = await usuariobd.excluirUsuario(id);
    res.json(resultado);

});

module.exports = router;
