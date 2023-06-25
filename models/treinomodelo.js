const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../BancoDeDados/connection");
const modeloUsuario = require("./usuariomodelo");
const modeloJogo  = require("./jogomodelo");

const modeloTreino = sequelize.define("Treino", {  
    fk_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fk_idJogo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    etapa:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    responsavel:{
        type: DataTypes.STRING,
        allowNull: false,  
    }
});

modeloTreino.sync({ force: false });
modeloTreino.belongsTo(modeloUsuario, { foreignKey: "fk_id" });
modeloTreino.belongsTo(modeloJogo, { foreignKey: "fk_idJogo" });

module.exports = modeloTreino;