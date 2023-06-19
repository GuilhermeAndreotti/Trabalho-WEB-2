import usuarioService from "./usuarioService.js"

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


const validaIdade = () => {
  const validaIdaderegex = /^(1[89]|[2-9][0-9])$/;
  if (!validaIdaderegex.test(getIdade())) {
    console.log("Idade inválida");
    return false;
  }
  return true;
};

const validaEmail = () => {
  const validaEmailregex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
  
  if (!validaEmailregex.test(getEmail())) {
    console.log("Email inválido");
    return false;
  }
  
  return true;
};

// Cadastrar
const cadastrar = async () => {
  if (validaEmail() && validaIdade()) {
    let resultadoToken = await usuarioService.cadastrarUsuario(
      getNome(),
      getIdade(),
      getEmail(),
      getSenha()
    );

    if (resultadoToken.errors) {
      alert("Houve um erro!" + resultadoToken.errors);
    } else {
      alert("Cadastrado com sucesso!");
      window.location.href = "http://localhost:3100/main/principal";
    }
  } else {
    alert("Cadastro inválido!");
  }
};

//Logar
const logar = async () => {

  let resultadoToken = await usuarioService.logarUsuario(getEmail(), getSenha());
      
  if(resultadoToken.errors){
      alert("Houve um erro!");
  } else {
      alert("Logando...");
      window.location.href = "http://localhost:3100/main/principal";
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