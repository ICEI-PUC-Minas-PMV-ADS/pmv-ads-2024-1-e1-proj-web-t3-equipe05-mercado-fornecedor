import Api from "./api.js";
import { geraPedidos } from "./listarpedidos.js";
import db from "../json/db.json" with {type: "json"};

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
    idItem: counterItensPedido + 1,
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
const objEndereco = {};

const exibirEndereco = (endereco) => {
  for (const campo in endereco) {
    if (document.getElementById(campo)) {
      let input = document.getElementById(campo);
      input.value = endereco[campo];
      objEndereco[campo] = endereco[campo];
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

async function criarPedidos() {
  const complEndereco = document.getElementById("add-complemento-pedido").value;
  const numEndereco = document.getElementById("add-numero-pedido").value;
  const prazo = document.getElementById("add-prazo-pedido").value;
  const obsPedido = document.getElementById("add-obs-pedido").value;
  let timeStamp = new Date();
  // const dia = timeStamp.getDate();
  // const ano = timeStamp.getFullYear();
  // const mes = timeStamp.getMonth() + 1;

  // const data = `${dia}/${mes}/${ano}`;

  objEndereco.complemento = complEndereco;
  objEndereco.numero = numEndereco;

  var os = timeStamp.getTimezoneOffset();
  timeStamp = new Date(timeStamp.getTime() - os * 60 * 1000);

  const pedido = userData.pedidos;
  let id;
  if (pedido.length !== 0) {
    id = pedido[pedido.length - 1].id + 1;
  }

  const objPedido = {
    id: id,
    data: timeStamp.toJSON(),
    endereco: objEndereco,
    prazoDeEntrega: prazo,
    observacao: obsPedido,
    itensDoPedido: arrayItensPedido,
    status: "em aberto",
    clienteId: userData.id,
    fornecedorId: null,
    cotacoes: [],
    valor: null,
  };

  pedido.push(objPedido);
  const meusPedidos = { pedidos: pedido };

  const editedUser = await Api.editarUsuario(meusPedidos, userData.id);
  localStorage.setItem("User", JSON.stringify(editedUser))

  const listaPedidos = document.getElementById("lista-de-pedidos-user");
  let listaChild = listaPedidos.lastElementChild;
  while (listaChild) {
    listaPedidos.removeChild(listaChild);
    listaChild = listaPedidos.lastElementChild;
  }

  let updatedUser = JSON.parse(localStorage.getItem("User"));
  db.users.forEach((user) => {
    if(user.email == userData.email) {
      // user.pedidos.push(objPedido)
      updatedUser.pedidos.push(objPedido)

      localStorage.setItem("User", JSON.stringify(updatedUser))
    }
  })

  console.log(updatedUser.pedidos.reverse())

  setTimeout(() => {
    geraPedidos(updatedUser.pedidos);
  }, 250);
}

btnCadastrar.addEventListener("click", (e) => {
  criarPedidos();
  document.getElementById("form-criar-pedido").reset();
});
