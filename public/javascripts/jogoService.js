const token = sessionStorage.getItem("token");

let jogoService = {
  
    cadastrarJogo: async function (id, nome, modalidade, descricao) {       
        const data = {
            method: "POST",
            headers: { "Content-type": "application/json",
            "Authorization": "Bearer " + token},
                body: JSON.stringify({
                    id: id,
                    nome: nome,
                    modalidade: modalidade,
                    descricao: descricao,
                }),
        };
        const resposta = await fetch("/apiJogos/cadastrar", data);
        return await resposta.json();
    },

    listarJogos: async function (id) {      
        const data = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token},
        };
      
        const resposta = await fetch("/apiJogos/listar/"+id, data);
        return await resposta.json();
    },

    excluirJogo: async function (id) {
        const data = {
            method: "DELETE",
            headers: { "Content-type": "application/json", 
            "Authorization": "Bearer " + token},
        };
        const resposta = await fetch("/apiJogos/" + id, data);
        return await resposta.json();
    },

    editarJogo: async function (id, nome, modalidade, descricao) {
        
        const data = {
            method: "PUT",
            headers: { "Content-type": "application/json" ,
            "Authorization": "Bearer " + token},
                body: JSON.stringify({
                    id: id,
                    nome: nome,
                    modalidade: modalidade,
                    descricao: descricao,    
                }),
            };
            const resposta = await fetch("/apiJogos/editar", data);
            return await resposta.json();
    },

};

export default jogoService;
