
let usuarioService = {

    cadastrarUsuario: async function(nome, idade, email, senha) {
    
        const data = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome, idade: idade, email: email, senha: senha})
        }

        const resposta = await fetch('/apiUsers/cadastrar', data)
        console.log(resposta)
        return await resposta.json()
    
    },

}

export default usuarioService