export const validaIdade = (idade) => {
    const validaIdaderegex = /^(1[89]|[2-9][0-9])$/;
    if (!validaIdaderegex.test(idade)) {
      alert("Idade inválida");
      return false;
    }
    return true;
};
  
export const validaEmail = (email) => {
    const validaEmailregex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
    
    if (!validaEmailregex.test(email)) {
      alert("Email inválido");
      return false;
    }
    return true;
};