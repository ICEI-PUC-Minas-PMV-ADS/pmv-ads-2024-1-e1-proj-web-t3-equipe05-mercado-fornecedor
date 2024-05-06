import Api from "./api.js";
import { listarPedidosPorCliente } from "./listarpedidos.js";

const userData = JSON.parse(localStorage.getItem("User"));

// ADICIONA E REMOVE ITENS DO MODAL NA JANELA MODAL PARA CRIAR PEDIDOS
let counterItensPedido = 0;
const arrayItensPedido = [];

const btnAddItem = document.getElementById("add-btn-item-pedido");
btnAddItem.addEventListener("click", function () {
  let itemPedido = document.getElementById("add-item-pedido").value;
  let qtdItemPedido = document.getElementById("add-qtd-item-pedido").value;

  const listaItensPedido = document.getElementById("lista-itens-pedido");

  const item = document.createElement("li");
  const nomeItem = document.createElement("div");
  const qtdItem = document.createElement("div");
  const closeBtnContainer = document.createElement("div");
  const closeBtn = document.createElement("i");

  item.classList.add("itens-pedido-cadastrados", "faded-out");
  item.setAttribute("id", "item-lista-id-" + counterItensPedido);
  nomeItem.setAttribute("class", "ipc-1");
  qtdItem.setAttribute("class", "ipc-1");
  closeBtnContainer.setAttribute("class", "item-close-icon");
  closeBtnContainer.setAttribute(
    "id",
    "item-close-btn-id-" + counterItensPedido
  );
  closeBtn.classList.add("fa-solid", "fa-xmark");

  nomeItem.innerText = itemPedido;
  qtdItem.innerText = qtdItemPedido;

  item.appendChild(nomeItem);
  item.appendChild(qtdItem);
  closeBtnContainer.appendChild(closeBtn);
  item.appendChild(closeBtnContainer);

  listaItensPedido.appendChild(item);

  requestAnimationFrame(() => {
    item.classList.remove("faded-out");
  });

  const objItemPedido = {
    nomeDoItem: itemPedido,
    qtdDoItem: qtdItemPedido,
    idItem: "item-lista-id-" + counterItensPedido,
  };

  arrayItensPedido.push(objItemPedido);

  const btnRemoveItem = document.getElementById(
    "item-close-btn-id-" + counterItensPedido
  );
  const itemLista = document.getElementById(
    "item-lista-id-" + counterItensPedido
  );
  btnRemoveItem.addEventListener("click", function () {
    itemLista.remove();
    const indexItem = arrayItensPedido
      .map((element) => element.idItem)
      .indexOf(itemLista.id);
    arrayItensPedido.splice(indexItem, 1);
  });
  counterItensPedido++;
});

//BUSCA ENDEREÇO PELO CEP E PREENCHE AUTOMATICAMENTE OS INPUTS
const inputCepPedidos = document.getElementById("buscar-btn-cep-pedido");
const arrayEndereco = [];

const exibirEndereco = (endereco) => {
  for (const campo in endereco) {
    if (document.getElementById(campo)) {
      let input = document.getElementById(campo);
      input.value = endereco[campo];
      arrayEndereco.push(endereco[campo]);
    }
  }
};

inputCepPedidos.addEventListener("click", (e) => {
  const cepPedidos = document.getElementById("add-cep-pedido");
  let cep = cepPedidos.value.replace("-", "");

  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
    .then((response) => {
      response.json().then((data) => exibirEndereco(data));
    })
    .catch((e) => console.log(e.message));
});

//CRIA PEDIDO E ENVIA ATRAVÉS DA API, SALVANDO OS DADOS NO SERVIDOR
const btnCadastrar = document.getElementById("btn-cadastrar-pedido");

function criarPedidos() {
  const prazo = document.getElementById("add-prazo-pedido").value;
  const obsPedido = document.getElementById("add-obs-pedido").value;
  const timeStamp = new Date();
  const dia = timeStamp.getDate();
  const ano = timeStamp.getFullYear();
  const mes = timeStamp.getMonth() + 1;

  const data = `${dia}/${mes}/${ano}`;

  const objPedido = {
    data: data,
    endereco: arrayEndereco,
    prazoDeEntrega: prazo,
    observacao: obsPedido,
    itensDoPedido: arrayItensPedido,
    status: "em aberto",
    userId: userData.id,
    fornecedorId: null,
  };

  Api.cadastrarPedido(objPedido);

  const listaPedidos = document.getElementById("lista-de-pedidos-user");
  let listaChild = listaPedidos.lastElementChild;
  while (listaChild) {
    listaPedidos.removeChild(listaChild);
    listaChild = listaPedidos.lastElementChild;
  }

  listarPedidosPorCliente(userData.id);
}

btnCadastrar.addEventListener("click", (e) => {
  criarPedidos();
  document.getElementById("form-criar-pedido").reset();
});
