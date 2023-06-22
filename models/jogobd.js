const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../BancoDeDados/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { modeloUsuario } = require("./usuariobd");

const modeloJogo = sequelize.define("Jogo", {
  
  fk_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

modeloJogo.sync({ force: false });

modeloJogo.belongsTo(modeloUsuario, { foreignKey: "fk_id" });

module.exports = {
  
  cadastrarJogos: async function (id, nome, modadlidade, descricao) {
    console.log("cheguei aqui bd com id =" + id)
    try {
      const resultado = await modeloJogo.create({
        fk_id: id,
        nome: nome,
        modalidade: modadlidade,
        descricao: descricao,
      });
    } catch (error) {
      return error;
    }
  },

};
