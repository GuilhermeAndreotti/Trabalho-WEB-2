const express = require("express");
const treinobd = require("../models/treinobd");
const router = express.Router();

router.post("/cadastrar", async (req, res) => {    
    try {
        const { id, data, etapa, jogo, obs, resp } = req.body;
        const resultado = await treinobd.cadastrarTreinos(
          id, 
          data, 
          etapa, 
          jogo, 
          obs,
          resp
        );
        res.json(resultado);
    } catch (error) {
      res.status(500).send({ falha: "Erro ao cadastrar o treino." });
    }
});

router.get('/listar/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const treinos = await treinobd.listarTreinos(id);
      res.json(treinos);

    }catch (error)
    {
      res.status(500).send({ falha: "Erro ao listar treinos." });
    }
});

router.get('/especifico/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const treino = await treinobd.listarTreinoEspecifico(id);
      res.json(treino);

    }catch (error)
    {
      res.status(500).send({ falha: "Erro ao listar treinos." });
  }
});

router.put("/editar", async (req, res) => {
    try {
      const { id, data, etapa, jogo, obs, resp } = req.body;
          
      const resultado = await treinobd.editarTreino(
        id, 
        data, 
        etapa, 
        jogo, 
        obs, 
        resp 
      );
      res.json(resultado);
    } catch (error) {
      res.status(500).send({ falha: "Erro ao editar treino." });
    }
});

router.delete("/:id", async (req, res) => {
    
    let { id } = req.params
    let resultado = await treinobd.excluirTreino(id)
    res.json(resultado);

});

router.get('/treinos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const treinos = await treinobd.treinosPorJogos(id);
    res.json(treinos);

  }catch (error)
  {
    res.status(500).send({ falha: "Erro ao listar treinos por jogos." });
  }
});

module.exports = router;
