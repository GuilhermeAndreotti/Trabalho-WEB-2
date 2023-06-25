const express = require("express");
const jogobd = require("../models/jogobd");
const router = express.Router();

router.post("/cadastrar", async (req, res) => {    
    try {
        const { id, nome, modalidade, descricao } = req.body;
        
        const jogo = await jogobd.cadastrarJogos(
        id,
        nome,
        modalidade,
        descricao
        );
        res.json(jogo);
        
    } catch (error) {
      res.status(500).send({ falha: "Erro ao acessar a rota..." });
    }
});

router.get('/listar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const jogos = await jogobd.listarJogos(id);
    res.json(jogos);

  }catch (error)
  {
    res.status(500).send({ falha: "Erro ao acessar a rota..." });
  }
});

router.put("/editar", async (req, res) => {
  try {
    const { id, nome, modalidade, descricao } = req.body;
        
    const resultado = await jogobd.editarJogo(
      id,
      nome,
      modalidade,
      descricao
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).send({ falha: "Erro ao acessar a rota..." });
  }
});

router.delete("/:id", async (req, res) => {
  
    let { id } = req.params
    let resultado = await jogobd.excluirJogos(id)
    res.json(resultado);

});

module.exports = router;
