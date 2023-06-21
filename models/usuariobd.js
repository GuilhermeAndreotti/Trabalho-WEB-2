const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../BancoDeDados/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
        { expiresIn: "1h" }
      );

      return token;

    } catch (error) {
      return error;
    }
  },
  
  logarUsuario: async function (email, senha) {
    try {
      const usuario = await modeloUsuario.findOne({ where: { email } });
      
      if (!usuario) {
        return { errors: "Usuário não encontrado" };
      }
      
      const senhavalida = await bcrypt.compare(senha, usuario.password);

      if (!senhavalida) {
        return { errors: "Senha inválida" };
      } 
      
      const token = jwt.sign(
        { usuario: usuario.dataValues },
        process.env.permissaojwt,
        { expiresIn: "1h" }
      );

      return token;

    } catch (error) {
      return { errors: "Erro ao autenticar usuário" };
    }
  },


  editarUsuario: async function (id, nome, idade, email, senha) {
    try {
      const usuario = await modeloUsuario.findByPk(id);
  
      if (!usuario) {
        return { errors: "Usuário não encontrado..." };
      } else {
        usuario.nome = nome;
        usuario.idade = idade;
        usuario.email = email;
        if (senha) {
          usuario.password = senha;
        }

        const token = jwt.sign(
          { usuario: usuario.dataValues },
          process.env.permissaojwt,
          { expiresIn: "1h" }
        );
  
        await usuario.save();
  
        return token;
      }
    } catch (error) {
      return { errors: "Houve um erro..." };
    }
  },

  excluirUsuario: async function (id) {
    
    console.log('excluiu = ' + id);

    try {
      const deletarUser = await modeloUsuario.destroy({ where: { id } });
      console.log('excluiu');
      if(!deletarUser){
        return { errors: "Houve um erro ao excluir..." };
      }

    } catch (error) {
      return { errors: "Houve um erro..." };
    }
  }
};
