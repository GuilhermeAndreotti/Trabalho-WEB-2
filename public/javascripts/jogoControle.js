import jogoService from "./jogoService.js"


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


// Cadastrar
const cadastrar = async () => {
    const token = sessionStorage.getItem("token");
    let resultado = await jogoService.cadastrarJogo(
        getId(),
        getNome(),
        getModalidade(),
        getDescricao(),
        token
    );

    if (resultado.errors) {
      alert(JSON.stringify(resultado.erros));
    } else {
      alert("O cadastro foi realizado.");
    }
};

const lerJogos = async () => {
  const token = sessionStorage.getItem("token");

  let resultado = await jogoService.listarJogos(getId(), token);

  if (resultado.errors) {
    alert(JSON.stringify(resultado.errors));
  } else {
    const tabela = document.querySelector('#jogosTable tbody');
    tabela.innerHTML = '';

    resultado.forEach(jogo => {
      
      const criaTR = document.createElement('tr');
      const idJogo = document.createElement('td');
      const nomeJogo = document.createElement('td');
      const modalidade = document.createElement('td');
      const descricao = document.createElement('td');

      idJogo.textContent = jogo.id;
      nomeJogo.textContent = jogo.nome;
      modalidade.textContent = jogo.modalidade;
      descricao.textContent = jogo.descricao;
      
      criaTR.appendChild(idJogo);
      criaTR.appendChild(nomeJogo);  
      criaTR.appendChild(modalidade);
      criaTR.appendChild(descricao);

      tabela.appendChild(criaTR);
    });
  }
};


window.onload = () => {

    lerJogos();

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