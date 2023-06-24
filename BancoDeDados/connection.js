const Sequelize = require("sequelize")
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.bancodedados,
    process.env.usuario,
    process.env.senhabd,
    {
        host: process.env.host, 
        dialect: process.env.dialect
    }
)

sequelize.authenticate().then(
    () => console.log("Conectado ao banco de dados")
)
.catch(
    error => console.log("Houve o seguinte erro ao conectar: "+ error)
)

module.exports = sequelize