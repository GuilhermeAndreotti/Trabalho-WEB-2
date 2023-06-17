const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../BancoDeDados/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const modeloUsuario = sequelize.define("Usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

modeloUsuario.sync({ force: false });

module.exports = {
  cadastrarUsuario: async function (nome, idade, email, senha) {
    try {
      const resultado = await modeloUsuario.create({
        nome: nome,
        idade: idade,
        email: email,
        password: senha,
      });

      const token = jwt.sign(
        { usuario: resultado.dataValues },
        process.env.permissaojwt,
        {expiresIn: "1h"}
      );
      return token;
    } catch (error) {
      return error;
    }
  },

  logarUsuario: async function (email, senha) {
    try {
      const usuario = await usuarioModel.findOne({ where: { email } });

      if (!usuario) {
        return new Error("Usuário não encontrado.");
      }

      const senhavalida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhavalida) {
        return new Error("Senha incorreta.");
      }

      const token = jwt.sign(
        { usuario: usuario.dataValues },
        process.env.permissaojwt,
        { expiresIn: "1h" }
      );

      return token;

    } catch (error) {
      return error;
    }
  },
};
