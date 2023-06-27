import jogoService from "./jogoService.js"
import treinoService from "./treinoService.js";
const token = sessionStorage.getItem("token");
//import PDFDocument from 'pdfkit';
//import saveAs from 'file-saver';

const getId = () => {
  return document.getElementById('id').value;
};

const getDadosTabela = async () => {
    const resultado = await treinoService.treinosPorData(getId());
    gerarGrafico(resultado);
}

const gerarGrafico = (resultado) =>{
    
    const arrayNomes = resultado.map(item => item['Jogo.nome']);
    const arrayCount = resultado.map(item => item.quantidade);
  
    const data = {
        labels: arrayNomes,
        datasets: [{
          data: arrayCount,
          backgroundColor: ['#3a34eb', '#34ebd9', '#8034eb', '#a834eb', '#eb3d34']
        }]
      };
  
      const options = {
        responsive: true,
        maintainAspectRatio: false
      };
  
      const ctx = document.getElementById('graficoPizza').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
      });
}

window.onload = () => {

    getDadosTabela();

}