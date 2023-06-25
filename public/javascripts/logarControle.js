import usuarioService from "./usuarioService.js"
import { validaEmail, validaIdade } from "./validations/validaUsuario.js";

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

// Cadastrar
const cadastrar = async () => {

    if (validaEmail(getEmail()) && validaIdade(getIdade())) {
      let resultadoToken = await usuarioService.cadastrarUsuario(
        getNome(),
        getIdade(),
        getEmail(),
        getSenha()
      );
  
      if (resultadoToken.errors) {
        alert("Email já está em uso.");
      } else {
        alert("Cadastrado com sucesso!");
        sessionStorage.setItem("token", resultadoToken);
        window.location.href = "/swordplay/principal?token="+resultadoToken;
      }
    } else {
      alert("Cadastro inválido!");
    }
  };
  
  //Logar
  const logar = async () => {
    
    let resultadoToken = await usuarioService.logarUsuario(getEmail(), getSenha());
  
    if(resultadoToken.errors){
        alert(JSON.stringify(resultadoToken.errors));
    } else {
        alert("Logando...");
        sessionStorage.setItem("token", resultadoToken);
        window.location.href = "/swordplay/principal?token="+resultadoToken;
    }       
  }

  window.onload = () => {

    const cadastrarButton = document.getElementById('cadastrarBtn');
    if (cadastrarButton) {
      cadastrarButton.addEventListener('click', cadastrar);
    }
  
    const logarButton = document.getElementById('logarBtn');
    if (logarButton) {
      logarButton.addEventListener('click', logar);
    }

}