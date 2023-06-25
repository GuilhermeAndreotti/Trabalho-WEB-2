import usuarioService from "./usuarioService.js"
import { validaEmail, validaIdade } from "./validations/validaUsuario.js";
const token = sessionStorage.getItem("token");

const getId = () => {
  return document.getElementById('id').value;
};

const getNome = () => {
  return document.querySelector('input[name="nomecad"]').value;
};

const getIdade = () => {
  return document.querySelector('input[name="idadecad"]').value;
};

const getEmail = () => {
  return document.querySelector('input[name="logincad"]').value;
};

const getSenha = () => {
  return document.querySelector('input[name="senhacad"]').value;
};

// Editar
const editar = async () => {
  
  if (validaEmail(getEmail()) && validaIdade(getIdade())) {
    let resultadoToken = await usuarioService.editarUsuario(
      getId(),
      getNome(),
      getIdade(),
      getEmail(),
      getSenha()
    );

    if (resultadoToken.errors) {
      alert("Houve um erro!" + resultadoToken.errors);
    } else {
      alert("Dados editados com sucesso!");
      sessionStorage.setItem("token", resultadoToken);
      window.location.href = "/swordplay/principal?token="+resultadoToken;
    }
  } else {
    alert("Houve um erro ao editar, verifique os campos!");
  }     
}

// Excluir
const excluir = async () => {
  
  let resultadoToken = await usuarioService.excluirUsuario(
    getId(), token
  );

  if(resultadoToken.erros){
    alert("Houve um erro ao excluir, tente novamente...")
  }else{
    alert("Usuário excluido com sucesso... nunca é um adeus...")
    window.location.href = "http://localhost:3100";
    sessionStorage.removeItem("token");
  }
  
}

window.onload = () => {

    const editarButton = document.getElementById('editarBtn');
    if (editarButton) {
      editarButton.addEventListener('click', editar);
    }

    const excluirButton = document.getElementById('excluirBtn');
    if (excluirButton) {
      excluirButton.addEventListener('click', excluir);
    }

}