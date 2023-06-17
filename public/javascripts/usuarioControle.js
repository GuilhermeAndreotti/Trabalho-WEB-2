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

const validaCampos = async () => {

    
}

// Cadastrar
const cadastrar = async () => {

    let resultadoToken = await usuarioService.cadastrarUsuario(getNome(), getNome(), getEmail(), getSenha());
        
    if(resultadoToken.errors){
        alert("Houve um erro!" + errors);
    } else {
        alert("Cadastrado com sucesso!");
        window.location.href = "http://localhost:3100/main/principal";
    }       
}

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