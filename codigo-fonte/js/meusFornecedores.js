const orders = JSON.parse(localStorage.getItem("listaDePedidos"));
const myUser = JSON.parse(localStorage.getItem("User"));
const listaF = JSON.parse(localStorage.getItem("Fornecedores"));

function fecharModal() {
  const modal = document.querySelector(".modal-fornecedor");
  const closeModalBtn = document.querySelectorAll(".close-modal-fornecedor");

  closeModalBtn.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("visible");
    });
  });
}

function criarModal(fornecedor) {
  const modal = document.querySelector(".modal-fornecedor");
  const modalTitle = document.getElementById("modal-fornecedor-title");
  const modalBody = document.getElementById("modal-fornecedor-body");

  while (modalBody.firstChild) {
    modalBody.firstChild.remove();
  }

  const modalBodyContainer = document.createElement("div");
  const detalhes = document.createElement("div");
  const marca = document.createElement("div");
  const img = document.createElement("img");

  const infoFornecedor = document.createElement("div");
  const titleInfo = document.createElement("h5");
  const infoTable = document.createElement("div");
  const infoTableDiv1 = document.createElement("div");
  const infoTableDiv1Div = document.createElement("div");
  const enderecoTitle = document.createElement("h6");
  const sectionParagraphEndereco1 = document.createElement("p");
  const sectionParagraphEndereco2 = document.createElement("p");
  const cep = document.createElement("p");
  const telefone = document.createElement("p");
  const infoTableDiv2 = document.createElement("div");
  const cnpj = document.createElement("div");
  const cnpjTitle = document.createElement("h6");
  const sectionParagraphCnpj = document.createElement("p");
  const emailTitle = document.createElement("h6");
  const sectionParagraphEmail = document.createElement("p");

  modalBodyContainer.classList.add("info-fornecedor");
  detalhes.classList.add("detalhes-empresa");
  marca.classList.add("marca-empresa");

  infoFornecedor.classList.add("info-empresa");
  infoTable.classList.add("info-table");
  cnpj.classList.add("info-cnpj");

  modalTitle.innerText = fornecedor.nome;
  img.src = fornecedor.imgUrl;
  titleInfo.innerText = "Informações";
  enderecoTitle.innerText = "Endereço";

  if (fornecedor.endereco !== null) {
    sectionParagraphEndereco1.innerText = `${fornecedor.endereco.logradouro}, nº ${fornecedor.endereco.numero} ${fornecedor.endereco.complemento}`;
    sectionParagraphEndereco2.innerText = `${fornecedor.endereco.bairro} - ${fornecedor.endereco.localidade}/${fornecedor.endereco.uf}`;
    cep.innerText = `CEP: ${fornecedor.endereco.cep}`;
    telefone.innerText = `Tel.: ${fornecedor.telefone}`;
  } else {
    sectionParagraphEndereco1.innerText = `Endereço não informado`;
    telefone.innerText = `Telefone não informado`;
  }

  cnpjTitle.innerText = "CNPJ";
  sectionParagraphCnpj.innerText = fornecedor.cnpj;
  emailTitle.innerText = "E-mail";
  sectionParagraphEmail.innerText = fornecedor.email;

  marca.append(img);

  infoTableDiv1.append(
    enderecoTitle,
    sectionParagraphEndereco1,
    sectionParagraphEndereco2,
    telefone
  );

  cnpj.append(cnpjTitle, sectionParagraphCnpj);
  infoTableDiv2.append(cnpj, emailTitle, sectionParagraphEmail);

  infoTable.append(infoTableDiv1, infoTableDiv2);

  infoFornecedor.append(titleInfo, infoTable);

  detalhes.append(marca, infoFornecedor);

  const pedidos = document.createElement("div");
  const pedidosTitle = document.createElement("h5");
  const pedidosListaTitulos = document.createElement("ul");
  const listaTitulosItem1 = document.createElement("li");
  const numero1 = document.createElement("div");
  const data1 = document.createElement("div");
  const status1 = document.createElement("div");

  const listaTitulosItem2 = document.createElement("li");
  const numero2 = document.createElement("div");
  const data2 = document.createElement("div");
  const status2 = document.createElement("div");

  pedidos.classList.add("pedidos-fornecedor");
  pedidosListaTitulos.classList.add("titulo-lista-fornecedor");

  pedidosTitle.innerText = "Pedidos";
  numero1.innerText = "Número";
  data1.innerText = "Data";
  status1.innerText = "Status";

  numero2.innerText = "Número";
  data2.innerText = "Data";
  status2.innerText = "Status";

  listaTitulosItem1.append(numero1, data1, status1);
  listaTitulosItem2.append(numero2, data2, status2);
  pedidosListaTitulos.append(listaTitulosItem1, listaTitulosItem2);

  const listaFornecedor = document.createElement("ul");
  listaFornecedor.classList.add("lista-fornecedor");

  const arrMeusPedidos = [];

  orders.forEach((pedido) => {
    if (
      pedido.fornecedorId === fornecedor.id &&
      pedido.clienteId === myUser.id
    ) {
      arrMeusPedidos.push(pedido);
    }
  });
  // arrayPedidosDefinidos.forEach((pedido) => {
  //   if (pedido.fornecedorId === fornecedor.id) arrMeusPedidos.push(pedido);
  // });

  for (let i = 0; i < 10; i++) {
    if (i >= arrMeusPedidos.length) break;

    const itemListaFornecedor = document.createElement("li");
    const numeroPedido = document.createElement("div");
    const dataPedido = document.createElement("div");
    const statusPedido = document.createElement("div");

    itemListaFornecedor.classList.add("lista-pedidos-fornecedor");
    numeroPedido.classList.add("item-pedidos-fornecedor");
    dataPedido.classList.add("item-pedidos-fornecedor");
    statusPedido.classList.add("item-pedidos-fornecedor");

    const dataFormatada = new Date(arrMeusPedidos[i].data);
    const dia = dataFormatada.getDate();
    const mes = dataFormatada.getMonth() + 1;
    const ano = dataFormatada.getFullYear();

    const shortOrderId = arrMeusPedidos[i].id.split("-")[0];

    numeroPedido.innerText = shortOrderId;
    dataPedido.innerText = `${dia}/${mes}/${ano}`;
    statusPedido.innerText = arrMeusPedidos[i].status;

    itemListaFornecedor.append(numeroPedido, dataPedido, statusPedido);
    listaFornecedor.append(itemListaFornecedor);
  }

  // arrMeusPedidos.forEach((pedido) => {
  //   const itemListaFornecedor = document.createElement("li");
  //   const numeroPedido = document.createElement("div");
  //   const dataPedido = document.createElement("div");
  //   const statusPedido = document.createElement("div");

  //   itemListaFornecedor.classList.add("lista-pedidos-fornecedor");
  //   numeroPedido.classList.add("item-pedidos-fornecedor");
  //   dataPedido.classList.add("item-pedidos-fornecedor");
  //   statusPedido.classList.add("item-pedidos-fornecedor");

  //   const dataFormatada = new Date(pedido.data);
  //   const dia = dataFormatada.getDate();
  //   const mes = dataFormatada.getMonth() + 1;
  //   const ano = dataFormatada.getFullYear();

  //   numeroPedido.innerText = pedido.id;
  //   dataPedido.innerText = `${dia}/${mes}/${ano}`;
  //   statusPedido.innerText = pedido.status;

  //   itemListaFornecedor.append(numeroPedido, dataPedido, statusPedido);
  //   listaFornecedor.append(itemListaFornecedor);
  // });

  pedidos.append(pedidosTitle, pedidosListaTitulos, listaFornecedor);
  modalBodyContainer.append(detalhes, pedidos);

  modalBody.append(modalBodyContainer);

  modal.classList.add("visible");

  fecharModal();
}

function buscarFornecedores(inputValue, arrayObjFornecedores) {
  let resultadoBusca = arrayObjFornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(inputValue.toLowerCase())
  );

  resultadoBusca.push(
    ...arrayObjFornecedores.filter((fornecedor) =>
      fornecedor.segmento.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  console.log(resultadoBusca);
  listarFornecedoresDoCliente(...[new Set(resultadoBusca)]);
}

export function buscarFornecedoresDoCliente() {
  const inputBusca = document.getElementById("buscar-fornecedores-input");

  inputBusca.addEventListener("input", function () {
    let textoBusca = inputBusca.value;

    buscarFornecedores(textoBusca, meusFornecedores);
  });
}

function filtrarFornecedoresPorCategoria(listaDeFornecedores) {
  const listaDeCategorias = document.getElementById(
    "dropdown-meus-fornecedores"
  );

  let categorias = [];

  listaDeFornecedores.forEach((fornecedor) =>
    categorias.push(fornecedor.segmento)
  );
  categorias.sort();
  categorias = [...new Set(categorias)];

  categorias.forEach((cat) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.classList.add("dropdown-item");
    a.href = "#";
    a.innerText = cat;
    a.value = cat;

    li.appendChild(a);
    listaDeCategorias.appendChild(li);

    li.addEventListener("click", (e) => {
      buscarFornecedores(a.value, meusFornecedores);
    });
  });
}

function listarFornecedoresDoCliente(listaMeusFornecedores) {
  const ulFornecedores = document.getElementById("lista-meus-fornecedores");

  while (ulFornecedores.firstChild) {
    ulFornecedores.removeChild(ulFornecedores.firstChild);
  }

  listaMeusFornecedores.forEach((fornecedor) => {
    const cardFornecedor = document.createElement("li");
    const containerImgFornecedor = document.createElement("div");
    const imgFornecedor = document.createElement("img");
    const nomeFornecedor = document.createElement("h4");
    const categoriaFornecedor = document.createElement("h5");
    const btnVerMais = document.createElement("button");

    cardFornecedor.classList.add("card-lista-usuarios");
    containerImgFornecedor.classList.add("img-lista-user");
    nomeFornecedor.classList.add("title-lista-user");
    categoriaFornecedor.classList.add("cat-lista-user");
    btnVerMais.classList.add("btn-lista-user");
    btnVerMais.setAttribute("id", "btn-mf-id-" + fornecedor.id);

    if (imgFornecedor !== null) {
      imgFornecedor.src = fornecedor.imgUrl;
    }

    nomeFornecedor.innerText = fornecedor.nome;

    if (categoriaFornecedor !== null) {
      categoriaFornecedor.innerText = fornecedor.segmento;
    }

    btnVerMais.innerText = "Ver mais";
    btnVerMais.type = "button";
    btnVerMais.href = "#ver-mais-fornecedores";

    containerImgFornecedor.append(imgFornecedor);
    cardFornecedor.append(
      containerImgFornecedor,
      nomeFornecedor,
      categoriaFornecedor,
      btnVerMais
    );

    ulFornecedores.append(cardFornecedor);

    const btn = document.getElementById("btn-mf-id-" + fornecedor.id);

    btn.addEventListener("click", function () {
      criarModal(fornecedor);
    });
  });
}

export function filtrarFornecedores(pedidos, userList) {
  const arrayFornecedores = [];

  pedidos.forEach((pedido) => {
    userList.forEach((user) => {
      if (user.id === pedido.fornecedorId && myUser.id === pedido.clienteId)
        arrayFornecedores.push(user);
    });
  });

  return [...new Set(arrayFornecedores)];
}

const meusFornecedores = filtrarFornecedores(orders, listaF);

buscarFornecedoresDoCliente();
filtrarFornecedoresPorCategoria(meusFornecedores);
listarFornecedoresDoCliente(meusFornecedores);

const menuTodos = document.getElementById("listar-todos-fornecedores");
menuTodos.addEventListener("click", (e) => {
  listarFornecedoresDoCliente(meusFornecedores);
});
