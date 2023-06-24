import usuarioService from "./usuarioService.js"


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
      alert("Email já está em uso.");
    } else {
      alert("Cadastrado com sucesso!");
      sessionStorage.setItem("token", resultadoToken);
      window.location.href = "http://localhost:3100/main/principal?token="+resultadoToken;
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
      window.location.href = "http://localhost:3100/main/principal?token="+resultadoToken;
  }       
}

// Editar
const editar = async () => {
  
  if (validaEmail() && validaIdade()) {
    
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
      window.location.href = "http://localhost:3100/main/principal?token="+resultadoToken;
    }
  } else {
    alert("Houve um erro ao editar, verifique os campos!");
  }     
}

// Excluir
const excluir = async () => {
  
  const token = sessionStorage.getItem("token")

  let resultadoToken = await usuarioService.excluirUsuario(
    getId(), token
  );

  if(resultadoToken.erros){
    alert("Houve um erro ao excluir, tente novamente...")
  }else{
    alert("Usuário excluido com sucesso... nunca é um adeus...")
    window.location.href = "http://localhost:3100";
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

    const editarButton = document.getElementById('editarBtn');
    if (editarButton) {
      editarButton.addEventListener('click', editar);
    }

    const excluirButton = document.getElementById('excluirBtn');
    if (excluirButton) {
      excluirButton.addEventListener('click', excluir);
    }

}