const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../BancoDeDados/connection");
const  modeloUsuario  = require("./usuariomodelo");

const modeloJogo = sequelize.define("Jogo", {
  
  fk_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  modalidade:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao:{
    type: DataTypes.STRING,
    allowNull: false,
  },  
});   

modeloJogo.sync({ force: false });
modeloJogo.belongsTo(modeloUsuario, { foreignKey: "fk_id" });

module.exports = modeloJogo;