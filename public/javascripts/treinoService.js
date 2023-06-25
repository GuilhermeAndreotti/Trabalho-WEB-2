const token = sessionStorage.getItem("token");

let treinoService = {   
    cadastrarTreino: async function (id, data, etapa, jogo, obs, resp) {       
        const requisicao = {
            method: "POST",
            headers: { "Content-type": "application/json",
            "Authorization": "Bearer " + token},
                body: JSON.stringify({
                    id: id,
                    data: data,
                    etapa: etapa,
                    jogo: jogo,
                    obs: obs,
                    resp: resp
                }),
        };
        const resposta = await fetch("/apiTreinos/cadastrar", requisicao);
        return await resposta.json();
    },

    listarTreinos: async function (id) {      
        const data = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token},
        };
      
        const resposta = await fetch("/apiTreinos/listar/"+id, data);
        return await resposta.json();
    },

    listarTreinoEspecifico: async function (id) {      
        const data = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token},
        };
      
        const resposta = await fetch("/apiTreinos/especifico/"+id, data);
        return await resposta.json();
    },
    editarTreino: async function (id, data, etapa, jogo, obs, resp) {
        const requisicaoData = {
            method: "PUT",
            headers: { "Content-type": "application/json" ,
            "Authorization": "Bearer " + token},
                body: JSON.stringify({
                    id: id,
                    data: data,
                    etapa: etapa,
                    jogo: jogo,
                    obs: obs,
                    resp: resp
                }),
            };
            const resposta = await fetch("/apiTreinos/editar", requisicaoData);
            return await resposta.json();
    },

    excluirTreino: async function (id) {
        const data = {
            method: "DELETE",
            headers: { "Content-type": "application/json", 
            "Authorization": "Bearer " + token},
        };
        const resposta = await fetch("/apiTreinos/" + id, data);
        return await resposta.json();
    },

    treinosPorData: async function (id) {      
        alert(id)
        const data = {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + token},
          };
        
          const resposta = await fetch("/apiTreinos/treinos/"+id, data);
          return await resposta.json();
        },
};

export default treinoService;
