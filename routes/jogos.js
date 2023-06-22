const express = require("express");
const usuariobd = require("../models/jogobd");
const router = express.Router();

router.post("/cadastrar", async (req, res) => {
    
    try {
        const { id, nome, modalidade, descricao } = req.body;
        
        const token = await usuariobd.cadastrarJogos(
        id,
        nome,
        modalidade,
        descricao
        );

        res.json(token);
    } catch (error) {
      res.status(500).send({ error: "Erro ao cadastrar jogo de sugestão." });
    }
});

module.exports = router;
