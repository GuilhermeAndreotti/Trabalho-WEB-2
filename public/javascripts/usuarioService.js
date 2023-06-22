let usuarioService = {
  
    cadastrarUsuario: async function (nome, idade, email, senha) {
        const data = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            nome: nome,
            idade: idade,
            email: email,
            senha: senha,
        }),
        };
        const resposta = await fetch("/cadastrar", data);
        return await resposta.json();
    },

    logarUsuario: async function(email, senha){
        const data = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
            };
            const resposta = await fetch("/logar", data);
            return await resposta.json();
    },

    
    editarUsuario: async function (id, nome, idade, email, senha) {
        
        const token = sessionStorage.getItem("token");
        
        const data = {
            method: "PUT",
            headers: { "Content-type": "application/json" ,
            Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                id: id,
                nome: nome,
                idade: idade,
                email: email,
                senha: senha            
            }),
            };
            const resposta = await fetch("/apiUsers/editar", data);
            return await resposta.json();
    },

    excluirUsuario: async function (id) {

        const token = sessionStorage.getItem("token");
        const data = {
            method: "DELETE",
            headers: { "Content-type": "application/json", 
            Authorization: `Bearer ${token}`},
        };
        const resposta = await fetch("/apiUsers/" + id, data);
        return await resposta.json();
    }

};

export default usuarioService;
