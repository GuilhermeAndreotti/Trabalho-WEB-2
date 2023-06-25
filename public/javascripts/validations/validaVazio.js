export const validaVazio = (validar) => {
    if (validar == '' || validar == undefined) {
      alert("Você deixou campos em branco.");
      return false;
    }
    return true;
};
  
