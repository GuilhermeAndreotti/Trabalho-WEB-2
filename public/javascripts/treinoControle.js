import jogoService from "./jogoService.js"
let cadastro = true;
let idJogo = -1;

const getId = () => {
  return document.getElementById('id').value;
};

const getNome = () => {
  return document.querySelector('input[name="jogonome"]').value;
};

const getModalidade = () => {
    let select = document.getElementById("modalidade");
    return select.value;
};

const getDescricao = () => {
    return document.getElementById("descricao").value;
};

const lerJogos = async () => {

    const token = sessionStorage.getItem("token");
    let resultado = await jogoService.listarJogos(getId(), token);
  
    if (resultado.errors) {
      alert(JSON.stringify(resultado.errors));
    } else {

    }
};

window.onload = () => {

    lerJogos();

    const cadastrarButton = document.getElementById('cadastrarBtn');
    if (cadastrarButton && cadastro == true){
      cadastrarButton.addEventListener('click', cadastrar);
    }

    const editarButton = document.getElementById('editarBtn');
    if (editarButton) {
      editarButton.addEventListener('click', editar);
    }

}