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
      window.location.href = "http://localhost:3100/main/cadastrarjogo?token="+token;
    }
};

const paginacao = async (resultado) => {
  
  const div_principal = document.getElementById('paginacao');
  const numPaginas = Math.ceil(resultado.length / 5);
  
  for(let i = 1; i <= numPaginas; i++){
    const numero = document.createElement('a');
    numero.style.color = 'blue'
    numero.style.fontSize = '20px'
    numero.style.marginRight = '25px'
    numero.textContent = i;
    
    numero.addEventListener('click', () =>{
      exibirTable(resultado, i);
    });
    div_principal.appendChild(numero);
  }
}

const exibirTable = async (resultado, i) => {
  
    const tabela = document.querySelector('#jogosTable tbody');
    tabela.innerHTML = '';
    const inicio = (i-1) * 5;
    const fim = inicio + 5;
    const itensPagina = resultado.slice(inicio, fim);
  
    itensPagina.forEach(jogo => {
      const criaTR = document.createElement('tr');
      const idJogo = document.createElement('td');
      const nomeJogo = document.createElement('td');
      const modalidade = document.createElement('td');
      const descricao = document.createElement('td');
      const btnEditar = document.createElement('td');
      const btnExcluir = document.createElement('td');
      const button = document.createElement('button');
      const button2 = document.createElement('button');
      
      idJogo.textContent = jogo.id;
      nomeJogo.textContent = jogo.nome;
      modalidade.textContent = jogo.modalidade;
      descricao.textContent = jogo.descricao;
      button.textContent = 'Alterar';
      button2.textContent = 'Excluir';
      
      button.style.backgroundColor = 'lightblue';
      button.style.width = '80px';
      button2.style.backgroundColor = '#FFA07A';
      button2.style.width = '80px';   
      idJogo.style.display = 'none';
      
      btnEditar.appendChild(button);
      btnExcluir.appendChild(button2);

      criaTR.appendChild(idJogo);
      criaTR.appendChild(nomeJogo);
      criaTR.appendChild(modalidade);
      criaTR.appendChild(descricao);
      criaTR.appendChild(btnEditar);
      criaTR.appendChild(btnExcluir);
      
      button.addEventListener('click', () => {
        setaValores(jogo);
      });
      
      button2.addEventListener('click', () => {
        excluirJogo(jogo.id);
      });

      tabela.appendChild(criaTR);
  })
}


const lerJogos = async () => {
  const token = sessionStorage.getItem("token");

  let resultado = await jogoService.listarJogos(getId(), token);

  if (resultado.errors) {
    alert(JSON.stringify(resultado.errors));
  } else {
    paginacao(resultado);
    exibirTable(resultado, 1);

  }
};

const excluirJogo = async (idJogo) => {

  const token = sessionStorage.getItem("token")

  let resultado = await jogoService.excluirJogo(
    idJogo, token
  );

  if(resultado.erros){
    alert("Houve um erro ao excluir, tente novamente...")
  }else{
    alert("Jogo excluído com sucesso.")
    window.location.href = "http://localhost:3100/main/cadastrarjogo?token="+token;
  }
  
}

const setaValores = (jogo) => {
    
    cadastro = false;
    // Altera os botões 
    const cadastrarButton = document.getElementById('cadastrarBtn');
    const editarButton = document.getElementById('editarBtn');
    cadastrarButton.style.display = "none";
    editarButton.style.display = "inline";
    // Apresenta os dados que estavam no td, no campo.
    idJogo = jogo.id;
    document.querySelector('input[name="jogonome"]').value = jogo.nome;
    document.getElementById("descricao").value = jogo.descricao;
    document.getElementById("modalidade").value = jogo.modalidade;   
}

// Editar
const editar = async () => {
    
    const token = sessionStorage.getItem("token")

    let resultado = await jogoService.editarJogo (
      idJogo,
      getNome(),
      getModalidade(),
      getDescricao(), 
      token
    );

    if (resultado.errors) {
      alert("Houve um erro!" + resultado.errors);
    } else {
      idJogo = -1;
      alert("Dados editados com sucesso!");
      window.location.href = "http://localhost:3100/main/cadastrarjogo?token="+token;
    }
} 
   


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