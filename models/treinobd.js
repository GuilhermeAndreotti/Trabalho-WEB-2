const modeloTreino = require("./treinomodelo");
const modeloJogo = require("./jogomodelo");

module.exports = {
    
    //cadastrarTreinos
    cadastrarTreinos: async function (id, data, etapa, jogo, obs, resp) {
        try {
            const resultado = await modeloTreino.create({
                fk_id: id,
                fk_idJogo: jogo,
                data: data,
                etapa: etapa,
                descricao: obs,
                responsavel: resp
            });

            return resultado;

        } catch (error) {
            return error;
        }
    },
    listarTreinos: async function (id) {
    
        try {
          const alltreinos = await modeloTreino.findAll({
            where: { fk_id: id },
            include: [{
                model: modeloJogo,
                attributes: ['nome'],
              }],
          });
          return alltreinos;
    
        } catch (error) {
          throw error;
        }
    },
    listarTreinoEspecifico: async function (id) {
    
        try {
          const treino = await modeloTreino.findOne({
            where: { id: id },
          });
          return treino;
    
        } catch (error) {
          throw error;
        }
    },
    editarTreino: async function ( id, data, etapa, jogo, obs, resp) {
        try {
          const treino = await modeloTreino.findByPk(id);
      
          if (!treino) {
            return { errors: "treino não encontrado..." };
          } else {
                treino.fk_idJogo = jogo,
                treino.data = data,
                treino.etapa = etapa,
                treino.descricao = obs,
                treino.responsavel = resp
      
                await treino.save();
                return treino;
          }
        } catch (error) {
          return { errors: "Houve um erro..." };
        }
      },

      excluirTreino: async function (id) {
        try {
          const deletarTreino = await modeloTreino.destroy({ where: { id } });
          if(!deletarTreino ){
            return { errors: "Houve um erro ao excluir..." };
          }
          return true;
    
        } catch (error) {
          return { errors: "Houve um erro..." };
        }
      },
    
}