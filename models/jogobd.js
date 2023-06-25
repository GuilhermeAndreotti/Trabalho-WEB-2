const modeloJogo = require("./jogomodelo");
const modeloUsuario = require("./usuariomodelo");

module.exports = {

  cadastrarJogos: async function (id, nome, modadlidade, descricao) {
    try {
      const resultado = await modeloJogo.create({
        fk_id: id,
        nome: nome,
        modalidade: modadlidade,
        descricao: descricao,
      });
      return resultado;
    } catch (error) {
      return error;
    }
  },

  listarJogos: async function (id) {
    
    try {
      const alljogos = await modeloJogo.findAll({
        where: { fk_id: id },
      });
      return alljogos;

    } catch (error) {
      throw error;
    }
  },

  excluirJogos: async function (id) {
    try {
      const deletarJogo = await modeloJogo.destroy({ where: { id } });
      if(!deletarJogo){
        return { errors: "Houve um erro ao excluir..." };
      }
      return true;

    } catch (error) {
      return { errors: "Houve um erro..." };
    }
  },

  editarJogo: async function (id, nome, modalidade, descricao) {
    try {
      const jogo = await modeloJogo.findByPk(id);
  
      if (!jogo) {
        return { errors: "Jogo não encontrado..." };
      } else {
          jogo.nome = nome;
          jogo.modalidade = modalidade;
          jogo.descricao = descricao;
  
          await jogo.save();
  
          return jogo;
      }
    } catch (error) {
      return { errors: "Houve um erro..." };
    }
  },

};
