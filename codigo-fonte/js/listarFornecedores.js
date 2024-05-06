import Api from "./api.js";

// BUSCA A LISTA DE FORNECEDORES NA API E SALVA NO LOCAL STORAGE
export async function salvarFornecedoresNoStorage() {
  const listaFornecedores = await Api.listarFornecedores();

  localStorage.setItem("fornecedores", JSON.stringify(listaFornecedores));
}

// LISTA OS FORNECEDORES NA PÁGINA FORNECEDORES.HTML
function listarFornecedores() {
  // Constante que armazena um array de objetos onde cada objeto representa um fornecedor
  // Os objetos estão no seguinte formato:
  // {
  //       cnpj: "30.091.596/0001-43",
  //       email: "contato@bayer.com",
  //       endereco: [
  //           bairro: "Vila Socorro",
  //           complemento: "",
  //           localidade: "São Paulo",
  //           logradouro: "Rua Domingos Jorge",
  //           numero: "1100",
  //           uf: "SP",
  //       ],

  //       id: 3,
  //       imgUrl: "https://i.ibb.co/hmjBTJ2/f3.png",
  //       nome: "Bayer",
  //       password: "$2a$10$zgAY9i0dddN0on5LT51NN.mHziPhdROT7m7WEbMvG897Drgj8wS9O",
  //       telefone: "2139481000",
  //       tipo: "fornecedor",
  //   }

  const listaDeFornecedores = JSON.parse(localStorage.getItem("fornecedores"));
}

listarFornecedores();
