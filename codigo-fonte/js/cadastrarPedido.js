import Api from "./api.js";
import { geraPedidos } from "./listarpedidos.js";

const userData = JSON.parse(localStorage.getItem("User"));
const objEndereco = {};

// ADICIONA E REMOVE ITENS DO MODAL NA JANELA MODAL PARA CRIAR PEDIDOS
let counterItensPedido = 0;
let objPedido = {};
const arrayItensPedido = [];

const enderecoCheckBox = document.getElementById("usar-endereco");

enderecoCheckBox.addEventListener("click", (e) => {
  const cepInput = document.getElementById("add-cep-pedido");
  const cepBtn = document.getElementById("buscar-btn-cep-pedido");
  const logradouroInput = document.getElementById("logradouro");
  const bairroInput = document.getElementById("bairro");
  const complementoInput = document.getElementById("add-complemento-pedido");
  const numeroInput = document.getElementById("add-numero-pedido");
  const localidadeInput = document.getElementById("localidade");
  const ufInput = document.getElementById("uf");

  if (enderecoCheckBox.checked === true) {
    cepInput.value = userData.endereco.cep;
    logradouroInput.value = userData.endereco.logradouro;
    bairroInput.value = userData.endereco.bairro;
    complementoInput.value = userData.endereco.complemento;
    numeroInput.value = userData.endereco.numero;
    localidadeInput.value = userData.endereco.localidade;
    ufInput.value = userData.endereco.uf;

    cepInput.disabled = true;
    cepBtn.disabled = true;
    logradouroInput.disabled = true;
    bairroInput.disabled = true;
    complementoInput.disabled = true;
    numeroInput.disabled = true;
    localidadeInput.disabled = true;
    ufInput.disabled = true;

    objEndereco.cep = userData.endereco.cep;
    objEndereco.logradouro = userData.endereco.logradouro;
    objEndereco.bairro = userData.endereco.bairro;
    objEndereco.complemento = userData.endereco.complemento;
    objEndereco.numero = userData.endereco.numero;
    objEndereco.localidade = userData.endereco.localidade;
    objEndereco.uf = userData.endereco.uf;
  } else {
    cepInput.disabled = false;
    cepBtn.disabled = false;
    logradouroInput.disabled = false;
    bairroInput.disabled = false;
    complementoInput.disabled = false;
    numeroInput.disabled = false;
    localidadeInput.disabled = false;
    ufInput.disabled = false;

    cepInput.value = "";
    logradouroInput.value = "";
    bairroInput.value = "";
    complementoInput.value = "";
    numeroInput.value = "";
    localidadeInput.value = "";
    ufInput.value = "";
  }
});

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

const exibirEndereco = (endereco) => {
  for (const campo in endereco) {
    if (document.getElementById(campo)) {
      let input = document.getElementById(campo);
      input.value = endereco[campo];
      objEndereco[campo] = endereco[campo];
    }
  }

  objEndereco.cep = endereco.cep;
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
  const enderecoCheckBox = document.getElementById("usar-endereco");
  if (enderecoCheckBox.checked == false) {
    const complEndereco = document.getElementById(
      "add-complemento-pedido"
    ).value;
    const numEndereco = document.getElementById("add-numero-pedido").value;
    objEndereco.complemento = complEndereco;
    objEndereco.numero = numEndereco;
  }
  const prazo = document.getElementById("add-prazo-pedido").value;
  const obsPedido = document.getElementById("add-obs-pedido").value;
  let timeStamp = new Date();

  var os = timeStamp.getTimezoneOffset();
  timeStamp = new Date(timeStamp.getTime() - os * 60 * 1000);
  let id = crypto.randomUUID();

  objPedido = {
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

  await Api.cadastrarPedido(objPedido);
  await Api.listarTodosPedidos();

  const listaDePedidos = JSON.parse(localStorage.getItem("listaDePedidos"));
  const listaCotacoes = JSON.parse(localStorage.getItem("Cotacoes"));
  const userPedidos = listaDePedidos.filter((p) => p.clienteId === userData.id);

  userPedidos.sort((d1, d2) => {
    d1 = new Date(d1.data);
    d2 = new Date(d2.data);

    return d2 - d1;
  });

  const listaPedidos = document.getElementById("lista-de-pedidos-user");
  let listaChild = listaPedidos.lastElementChild;
  while (listaChild) {
    listaPedidos.removeChild(listaChild);
    listaChild = listaPedidos.lastElementChild;
  }

  const listaItensPedido = document.getElementById("lista-itens-pedido");
  listaItensPedido.innerHTML = "";
  setTimeout(() => {
    geraPedidos(userPedidos);
    // window.location.reload();
  }, 2000);
}

btnCadastrar.addEventListener("click", (e) => {
  criarPedidos();
  document.getElementById("form-criar-pedido").reset();
});
