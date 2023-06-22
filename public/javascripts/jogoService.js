let jogoService = {
  
    cadastrarJogo: async function (id, nome, modalidade, descricao, token) {       
        const data = {
            method: "POST",
            headers: { "Content-type": "application/json",
            "Authorization": "Bearer "+token},
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

    listarJogos: async function (id, token) {
        
        const data = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token},
        };
      
        const resposta = await fetch("/apiJogos/listar/"+id, data);
        return await resposta.json();
      }

};

export default jogoService;
