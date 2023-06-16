import usuarioService from "./usuarioService.js"


const validaCampos = async () => {

    
}

// Cadastrar
const cadastrar = async () => {

    const nome = document.querySelector('input[name="nomecad"]').value;
    const idade = document.querySelector('input[name="idadecad"]').value;
    const email = document.querySelector('input[name="logincad"]').value;
    const senha = document.querySelector('input[name="senhacad"]').value;

    let resultadoToken = await usuarioService.cadastrarUsuario(nome, idade, email, senha);
        
    if(resultadoToken.errors){
        alert("Houve um erro!");
    } else {
        alert("Cadastrado com sucesso!");
        window.location.href = "http://localhost:3100/main/principal";
    }       
 
}

window.onload = () => {

    const cadastrarButton = document.getElementById('cadastrarBtn');
    cadastrarButton.addEventListener('click', cadastrar);

}