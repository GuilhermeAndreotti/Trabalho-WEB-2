const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BancoDeDados/connection")
const jwt = require("jsonwebtoken");

const modeloUsuario = sequelize.define("Usuario", {
    
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

})

modeloUsuario.sync({force: true})

module.exports = {
    
    cadastrarUsuario: async function (nome, idade, email, senha) {
        
        try{
            const resultado = await modeloUsuario.create({
                nome: nome,
                idade: idade,
                email: email,
                password: senha
            })
            
            const token = jwt.sign({usuario:resultado.dataValues}, process.env.permissaojwt, {
                expiresIn: "1h"
            })
            return token

        }catch(error){
            return error
        }
    },
}