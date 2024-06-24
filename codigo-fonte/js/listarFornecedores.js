import Api from "./api.js";

// LISTA OS FORNECEDORES NA PÁGINA FORNECEDORES.HTML
function listarFornecedores() {
  const listaDeFornecedores = JSON.parse(localStorage.getItem("Fornecedores"));

  const ul = document.getElementById("lista-de-fornecedores");
  listaDeFornecedores.forEach((f) => {
    const li = document.createElement("li");
    li.classList.add("card-fornecedor");

    li.innerHTML = `
    <img src="${f.imgUrl}" class="card-img-top" alt="${f.nome}" />
      <div class="card-body">
        <h5 class="card-fornecedor-title">${f.nome}</h5>
        <p class="card-fornecedor-text">${f.segmento}</p>
      </div>`;

    ul.append(li);
  });
}

await Api.listarFornecedores();
listarFornecedores();
