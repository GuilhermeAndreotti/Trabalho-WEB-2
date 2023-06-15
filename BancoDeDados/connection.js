const Sequelize = require("sequelize")

const sequelize = new Sequelize("swordplayweb2","root","asd123asd", {
    host: "localhost", dialect: "mysql"
})

sequelize.authenticate().then(
    () => console.log("Conectado ao banco de dados")
)
.catch(
    error => console.log("Houve o seguinte erro ao conectar: "+ error)
)

module.exports = sequelize