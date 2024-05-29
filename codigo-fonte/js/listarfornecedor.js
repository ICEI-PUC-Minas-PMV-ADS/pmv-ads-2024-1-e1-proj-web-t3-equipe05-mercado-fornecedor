import db from "../json/db.json" with {type: "json"};
function listarFornecedores() {
    //const response = await fetch('db.json'); // Buscando o arquivo db.json
    //const data = await response.json(); // Convertendo a resposta em um objeto JavaScript
    //const fornecedores = data.fornecedores; // Obtendo a lista de fornecedores
    console.log(db)
    const ul = document.getElementById('listaFornecedores'); // Obtendo a lista HTML
    
    fornecedores.forEach(fornecedor => {
      const item = document.createElement('li'); // Criando um elemento 'li' para cada fornecedor
      item.textContent = fornecedor.nome + ' - ' + fornecedor.endereco + ' - ' + fornecedor.telefone;
      lista.appendChild(item); // Adicionando o item à lista HTML
    });
  }







