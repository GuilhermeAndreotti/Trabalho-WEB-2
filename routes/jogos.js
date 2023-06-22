const express = require("express");
const jogobd = require("../models/jogobd");
const router = express.Router();

router.post("/cadastrar", async (req, res) => {    
    try {
        const { id, nome, modalidade, descricao } = req.body;
        
        const token = await jogobd.cadastrarJogos(
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

router.get('/listar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const jogos = await jogobd.listarJogos(id);
    res.json(jogos);

  }catch (error)
  {
    res.status(500).send({ error: "Erro ao listar jogos de sugestão." });
  }
});

module.exports = router;
