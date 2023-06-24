import jogoService from "./jogoService.js"
let cadastro = true;
let idJogo = -1;

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

const getDescricao = () => {
    return document.getElementById("descricao").value;
};

const lerJogos = async () => {

    const token = sessionStorage.getItem("token");
    let resultado = await jogoService.listarJogos(getId(), token);
  
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

window.onload = () => {

    lerJogos();



}