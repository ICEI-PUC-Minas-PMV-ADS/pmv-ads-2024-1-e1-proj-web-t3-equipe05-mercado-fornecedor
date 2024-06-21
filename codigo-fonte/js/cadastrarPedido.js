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
  let itemPedido = document.getElementById("add-item-pedido");
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

  nomeItem.innerText = itemPedido.value;
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
    nomeDoItem: itemPedido.value,
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

  itemPedido.value = "";
  counterItensPedido++;
});

const inputItem = document.getElementById("add-item-pedido");

function buscarItensDePedidos(inputValue) {
  let resultadoBusca = userData.itensDePedidos.filter(
    (item) =>
      item.nomeDoItem.toLowerCase().includes(inputValue.toLowerCase()) &&
      inputValue !== ""
  );

  const listaItens = document.getElementById("list-itens");
  listaItens.innerHTML = "";

  resultadoBusca.slice(0, 5).forEach((item) => {
    const itemLista = document.createElement("li");
    itemLista.setAttribute("id", "item-lista-id" + item.id);
    itemLista.innerText = item.nomeDoItem;
    listaItens.append(itemLista);
    listaItens.style.display = "block";

    const itemName = document.getElementById("item-lista-id" + item.id);
    itemName.addEventListener("click", (e) => {
      inputItem.value = itemName.innerText;
      listaItens.innerHTML = "";
      listaItens.style.display = "none";
    });
  });

  if (resultadoBusca.length === 0) listaItens.style.display = "none";
}

inputItem.addEventListener("input", (e) => {
  buscarItensDePedidos(inputItem.value);
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
  const segmentoPedido = document.getElementById("add-obs-pedido").value;
  let timeStamp = new Date();

  var os = timeStamp.getTimezoneOffset();
  timeStamp = new Date(timeStamp.getTime() - os * 60 * 1000);
  let id = crypto.randomUUID();

  const arrayItensNovos = [...arrayItensPedido];
  const arrayItensFinais = [];
  const filteredArray = arrayItensNovos.filter(
    (item1) =>
      !userData.itensDePedidos.some(
        (item2) => item1.nomeDoItem === item2.nomeDoItem
      )
  );

  console.log(filteredArray);

  objPedido = {
    id: id,
    data: timeStamp.toJSON(),
    endereco: objEndereco,
    prazoDeEntrega: prazo,
    observacao: "",
    itensDoPedido: arrayItensPedido,
    status: "em aberto",
    clienteId: userData.id,
    fornecedorId: null,
    valor: null,
    segmento: segmentoPedido,
  };

  filteredArray.forEach((itemP) => {
    const objItemPedidoNovos = {
      nomeDoItem: itemP.nomeDoItem,
      id: crypto.randomUUID(),
    };

    arrayItensFinais.push(objItemPedidoNovos);
  });

  userData.itensDePedidos.push(...arrayItensFinais);

  const objNovosPedidos = {
    itensDePedidos: userData.itensDePedidos,
  };

  await Api.cadastrarPedido(objPedido);
  await Api.editarUsuario(objNovosPedidos, userData.id);
  await Api.listarTodosPedidos();

  const listaDePedidos = JSON.parse(localStorage.getItem("listaDePedidos"));
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
    Toastify({
      close: true,
      // duration: 120000,
      text: "Pedido cadastrado com sucesso!",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00F260, #0575E6)",
      },
    }).showToast();

    geraPedidos(userPedidos);
    // window.location.reload();
  }, 2000);
}

btnCadastrar.addEventListener("click", (e) => {
  criarPedidos();
  document.getElementById("form-criar-pedido").reset();
});
