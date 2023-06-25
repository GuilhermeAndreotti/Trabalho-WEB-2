export const validaData = (data) => {
    const dataregex = /^(202[3-9]|20[3-9][0-9])-([0][1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
    if (!dataregex.test(data))
    {
        alert("Data inválida: Apenas datas depois de 2022");
        return false;
    }

    return true;
};
