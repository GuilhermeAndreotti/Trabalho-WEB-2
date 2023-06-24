const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../BancoDeDados/connection");
const { modeloUsuario } = require("./usuariobd");
const { modeloJogo } = require("./jogobd");

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
        type: DataTypes.DATE,
        allowNull: false
    },
    etapa:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});

modeloTreino.sync({ force: false });
modeloTreino.belongsTo(modeloUsuario, { foreignKey: "fk_id" });
modeloTreino.belongsTo(modeloJogo, { foreignKey: "fk_idJogo" });

