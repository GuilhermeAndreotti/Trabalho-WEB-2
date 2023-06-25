import jogoService from "./jogoService.js"
import treinoService from "./treinoService.js";
const token = sessionStorage.getItem("token");
let cadastro = true;

const getId = () => {
  return document.getElementById('id').value;
};

const getData = () => {
  return document.querySelector('input[name="treino"]').value;
};

const getEtapa = () => {
    let select = document.getElementById("etapa");
    return select.value;
};

const getJogoID = () => {
  let select = document.getElementById("jogopassado");
  return select.value;
};

const getOBS = () => {
    return document.getElementById("observacao").value;
};

const getResp = () => {
  return document.querySelector('input[name="responsavel"]').value;
};

const randomNumero = () => {
  return Math.floor(Math.random() * (5) + 1);
}


const lerJogos = async () => {

    let resultado = await jogoService.listarJogos(getId());
  
    if (resultado.errors) {
      alert(JSON.stringify(resultado.errors));
    } else {
        const selectJogo = document.getElementById('jogopassado');
        resultado.forEach((jogo) =>
        {
            const optionJogo = document.createElement('option');
            optionJogo.value = jogo.id;
            optionJogo.textContent = jogo.nome;
            selectJogo.appendChild(optionJogo);
        });
    }
};

const cadastrar = async () => {

  let resultado = await treinoService.cadastrarTreino(
      getId(),
      getData(),
      getEtapa(),
      getJogoID(),
      getOBS(),
      getResp(),
  );

  if (resultado.errors) {
    alert("ERRO = " + resultado.erros);
  } else {
    alert("Treino cadastrado com sucesso!");
    window.location.href = "/swordplay/cadastrartreino?token="+token;
  }
};

const lerTreinos = async () => {

  let resultado = await treinoService.listarTreinos(getId());

  if (resultado.errors) {
    alert(JSON.stringify(resultado.errors));
  } else {
    paginacao(resultado);
    exibirCard(resultado, 1);
  }
};

// Cria os índices e chama a função que irá criar dinamicamente os cards.
const paginacao = async (resultado) => {
  
  const div_principal = document.getElementById('principal');
  const numPaginas = Math.ceil(resultado.length / 6);
  
  for(let i = 1; i <= numPaginas; i++){
    const numero = document.createElement('a');
    numero.style.color = 'blue'
    numero.style.fontSize = '20px'
    numero.style.marginRight = '25px'
    numero.textContent = i;
    
    numero.addEventListener('click', () =>{
      exibirCard(resultado, i);
    });
    div_principal.appendChild(numero);
  }
}


const exibirCard = async (resultado, i) => {
  
  const div_behind = document.getElementById('div-pai');
  div_behind.innerHTML = '';
  
  const inicio = (i-1) * 6;
  const fim = inicio + 6;
  const itensPagina = resultado.slice(inicio, fim);

  itensPagina.forEach(treino => {

    const divFilho = document.createElement('div');
    divFilho.className = 'grid-filho';
    const divTreino = document.createElement('div');
    divTreino.className = 'div-treino';

    const divResp = document.createElement('div');
    const divEtapa = document.createElement('div');
    const idTreino = document.createElement('div');
    const imgRandom = document.createElement('img');
    imgRandom.className = 'escudo';
    const divPricipal = document.createElement('div');

    idTreino.innerHTML = treino.id;
    idTreino.style.display = 'none'
    divTreino.innerHTML = "<b> Treino: </b>" + treino.data.split('-').reverse().join('/');
    imgRandom.src = '../images/'+randomNumero()+'.jpg';
    divResp.innerHTML = "<b> Responsável: </b>" +  treino.responsavel;
    divEtapa.innerHTML = "<b> Etapa: </b>" + treino.etapa;
    divPricipal.innerHTML = "<b> Jogo Principal: </b>" + treino.Jogo.nome;
    divFilho.appendChild(divTreino);
    divFilho.appendChild(imgRandom);
    divFilho.appendChild(divResp);
    divFilho.appendChild(divEtapa);
    divFilho.appendChild(idTreino);
    divFilho.appendChild(divPricipal);
    div_behind.appendChild(divFilho);
    
    divFilho.addEventListener('click', () => {
        sessionStorage.setItem("idTreino", treino.id);
        sessionStorage.setItem("edicao", true);
        window.location.href = "/swordplay/cadastrartreino?token="+token;
    });

  })
}

const setaValores = async () => {

  const idTreino = sessionStorage.getItem("idTreino")
  const cadastrarButton = document.getElementById('cadastrarBtn');
  const editarButton = document.getElementById('editarBtn');
  const excluirButton = document.getElementById('excluirBtn');
  cadastrarButton.style.display = "none";
  editarButton.style.display = "inline";
  excluirButton.style.display = "inline";

  let resultado = await treinoService.listarTreinoEspecifico(idTreino, token);

  if (resultado.errors) {
    alert(JSON.stringify(resultado.errors));
  } else {
    document.querySelector('input[name="treino"]').value = resultado.data;
    document.getElementById("etapa").value = resultado.etapa;
    document.getElementById("jogopassado").value = resultado.fk_idJogo;
    document.getElementById("observacao").value = resultado.descricao;
    document.querySelector('input[name="responsavel"]').value = resultado.responsavel
  }

}

// Editar
const editar = async () => {
  
  let resultado = await treinoService.editarTreino(
    sessionStorage.getItem("idTreino"),
    getData(),
    getEtapa(),
    getJogoID(),
    getOBS(),
    getResp(),
  );
  if (resultado.errors) {
    alert("Houve um erro!" + resultado.errors);
  } else {
    alert("Dados editados com sucesso!");
    window.location.href = "/swordplay/principal?token="+token;
  }
} 

const excluirTreino = async (idJogo) => {

  let resultado = await treinoService.excluirTreino(
    sessionStorage.getItem("idTreino"), token
  );

  if(resultado.erros){
    alert("Houve um erro ao excluir, tente novamente...")
  }else{
    alert("Treino excluído com sucesso.")
    window.location.href = "/swordplay/principal?token="+token;
  }
}

window.onload = () => {
    lerJogos();
    const principal = document.getElementById('principal');
    if(principal){
      sessionStorage.setItem("edicao", false);
      lerTreinos();
    }
    
    if (sessionStorage.getItem("edicao") === "true") {
      //lerJogos();
      setaValores();
      sessionStorage.setItem("edicao", false);
    }
    const editarButton = document.getElementById('editarBtn');
    if (editarButton){
      editarButton.addEventListener('click', editar);
    }

    const excluirButton = document.getElementById('excluirBtn');
    if (excluirButton){
      excluirButton.addEventListener('click', excluirTreino);
    }

    const cadastrarButton = document.getElementById('cadastrarBtn');
    if (cadastrarButton){
      cadastrarButton.addEventListener('click', cadastrar);
    }

}