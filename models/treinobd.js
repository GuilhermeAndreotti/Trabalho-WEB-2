const modeloTreino = require("./treinomodelo");
const modeloJogo = require("./jogomodelo");
const { Sequelize } = require('../BancoDeDados/connection');

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
          return { falha: "Erro ao cadastrar: Verifique os campos." };
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
          return { falha: "Erro ao listar: Tente novamente." };
        }
    },
    listarTreinoEspecifico: async function (id) {
    
        try {
          const treino = await modeloTreino.findOne({
            where: { id: id },
          });
          return treino;
    
        } catch (error) {
          return { falha: "Erro ao listar: Tente novamente." };
        }
    },
    editarTreino: async function ( id, data, etapa, jogo, obs, resp) {
        try {
          const treino = await modeloTreino.findByPk(id);
      
          if (!treino) {
            return { falha: "treino não encontrado..." };
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
          return { falha: "Erro ao editar: Verifique os campos." };
        }
      },
      excluirTreino: async function (id) {
        try {
          const deletarTreino = await modeloTreino.destroy({ where: { id } });
          if(!deletarTreino ){
            return { falha: "Houve um erro ao excluir..." };
          }
          return true;
        } catch (error) {
          throw error;
        }
      },
      treinosPorJogos: async function (id) {
        try {
          const resultado = await modeloTreino.findAll({
            attributes: [
              'fk_idJogo',
              [Sequelize.fn('COUNT', Sequelize.col('*')), 'quantidade']
            ],
            include: [{
              model: modeloJogo,
              attributes: ['nome']
            }],
            where: {
              fk_id: id
            },
            group: ['fk_idJogo'],
            raw: true
          });
      
          return resultado;
        } catch (error) {
          throw error;
        }
      },    
}