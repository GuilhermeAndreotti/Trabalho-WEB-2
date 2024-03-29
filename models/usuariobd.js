const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const modeloUsuario = require("./usuariomodelo");

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
      return { falha: "Erro ao cadastrar: Email em uso..." };
    }
  },
  
  logarUsuario: async function (email, senha) {
    try {
      const usuario = await modeloUsuario.findOne({ where: { email } });
      
      if (!usuario) {
        return { falha: "Usuário não encontrado" };
      }
      
      const senhavalida = await bcrypt.compare(senha, usuario.password);

      if (!senhavalida) {
        return { falha: "Senha inválida" };
      } 
      
      const token = jwt.sign(
        { usuario: usuario.dataValues },
        process.env.permissaojwt,
        { expiresIn: "1h" }
      );

      return token;

    } catch (error) {
      return { falha: "Erro ao autenticar usuário" };
    }
  },

  editarUsuario: async function (id, nome, idade, email, senha) {
    try {
      const usuario = await modeloUsuario.findByPk(id);
  
      if (!usuario) {
        return { falha: "Usuário não encontrado..." };
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
      return { falha: "Houve um erro..." };
    }
  },

  excluirUsuario: async function (id) {
    try {
      const deletarUsuario = await modeloUsuario.destroy({ where: { id } });

      if (deletarUsuario > 0) {
        return true;
      }

    } catch (error) {
      return { falha: "Erro: Exclua primeiro o registo de jogo e treino"};
    }
  }

};
