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
      return { falha: "Erro: Houve um problema ao cadastrar um jogo. Verifique os campos."};
    }
  },

  listarJogos: async function (id) {
    
    try {
      const alljogos = await modeloJogo.findAll({
        where: { fk_id: id },
      });
      return alljogos;

    } catch (error) {
      return { falha: "Erro: Houve um problema ao listar os jogos."};
    }
  },

  excluirJogos: async function (id) {
    try {
      const deletarJogo = await modeloJogo.destroy({ where: { id } });

      if (deletarJogo > 0) {
        return true;
      }

    } catch (error) {
      return { falha: "Erro: Exclua primeiro o registo de treino"};
    }
  },

  editarJogo: async function (id, nome, modalidade, descricao) {
    try {
      const jogo = await modeloJogo.findByPk(id);
  
      if (!jogo) {
        return { falha: "Jogo não encontrado..." };
      } else {
          jogo.nome = nome;
          jogo.modalidade = modalidade;
          jogo.descricao = descricao;
  
          await jogo.save();  
          return jogo;

      }
    } catch (error) {
      return { falha: "Erro: Houve um problema ao editar o jogo em questão."};
    }
  },

};
