import Api from "./api.js";

const userData = JSON.parse(localStorage.getItem("User"));
const pedidosLista = await Api.filtrarPedidosPorUser(userData.id);
const pedidosPaginados = [];

export async function listarPedidosPorCliente(pedidos) {
  const listaPedidos = document.getElementById("lista-de-pedidos-user");
  while (listaPedidos.firstChild) {
    listaPedidos.removeChild(listaPedidos.firstChild);
  }

  for (const pedido of pedidos) {
    const item = document.createElement("div");
    const itemLink = document.createElement("a");
    const gridPedido = document.createElement("div");
    const numeroDoPedido = document.createElement("div");
    const dataDoPedido = document.createElement("div");
    const containerPedido = document.createElement("div");
    const containerImg = document.createElement("div");
    const imgUser = document.createElement("img");
    const nomeUser = document.createElement("span");
    const valorPedido = document.createElement("div");
    const statusPedido = document.createElement("div");
    const containerBtn = document.createElement("div");
    const verMaisBtn = document.createElement("button");

    const detalhesPedido = document.createElement("div");
    const infoPedido = document.createElement("p");

    item.classList.add("accordion-list-item");
    item.setAttribute("id", "pedido-id-" + pedido.id);
    itemLink.classList.add("accordion-link");
    gridPedido.classList.add("lista-grid-pedidos");
    numeroDoPedido.classList.add("item-lista", "item-lista-1");
    dataDoPedido.classList.add("item-lista", "item-lista-2");
    containerPedido.classList.add(
      "item-fornecedor",
      "item-lista",
      "item-lista-3"
    );
    containerImg.classList.add("icon-fornecedor");
    nomeUser.classList.add("nome-fornecedor");
    valorPedido.classList.add("item-lista", "item-lista-4");
    statusPedido.classList.add("item-lista", "item-lista-5");
    containerBtn.classList.add("item-lista", "item-lista-6");
    verMaisBtn.classList.add("btn-mais");

    detalhesPedido.classList.add("detalhe-pedido");

    itemLink.href = "#pedido-id-" + pedido.id;
    numeroDoPedido.innerText = pedido.id;

    const data = new Date(pedido.data);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    dataDoPedido.innerText = `${dia}/${mes}/${ano}`;

    if (pedido.fornecedorId !== null) {
      const fornecedor = await Api.listarUsuariosPorId(pedido.fornecedorId);
      imgUser.src = fornecedor[0].imgUrl;
      nomeUser.innerText = fornecedor[0].nome;
      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(pedido.valor);
      valorPedido.innerText = valor;
    } else {
      imgUser.src = "./img/defaultUser.png";
      nomeUser.innerText = "Fornecedor não definido";
      valorPedido.innerText = "-";
    }

    statusPedido.innerText = pedido.status;
    verMaisBtn.innerText = "Ver mais";

    containerImg.appendChild(imgUser);
    containerPedido.appendChild(containerImg);
    containerPedido.appendChild(nomeUser);

    containerBtn.appendChild(verMaisBtn);

    gridPedido.append(
      numeroDoPedido,
      dataDoPedido,
      containerPedido,
      valorPedido,
      statusPedido,
      containerBtn
    );

    itemLink.appendChild(gridPedido);
    item.appendChild(itemLink);
    listaPedidos.appendChild(item);
  }
}

function paginacaoPedidos(pedidos) {
  // Paginação de pedidos usando a Api
  // let i = 1;
  // let pedidos = pedidosLista;

  // while (pedidos.length !== 0) {
  //   pedidos = await Api.listarPedidosPaginados(i);
  //   pedidosPaginados.push(pedidos);

  //   i++;
  // }
  // pedidosPaginados.pop();

  // Paginação de pedidos manualmente
  let i = 0;
  let arr = [];
  pedidosPaginados.length = 0;

  for (i = 0; i < pedidos.length; i++) {
    if (i % 10 == 0 && i !== 0) {
      pedidosPaginados.push(arr);
      arr = [];
    }
    arr.push(pedidos[i]);
  }

  if (arr.length !== 0) {
    pedidosPaginados.push(arr);
  }

  return pedidosPaginados;
}

export function geraPedidos(pedidos) {
  console.log(pedidos);
  const listaDePaginas = document.getElementById("lista-paginas");

  while (listaDePaginas.firstChild) {
    listaDePaginas.removeChild(listaDePaginas.firstChild);
  }

  paginacaoPedidos(pedidos);

  listarPedidosPorCliente(pedidosPaginados[0]);

  if (pedidosPaginados.length > 1) {
    const liBack = document.createElement("li");
    const back = document.createElement("i");
    back.classList.add("fa-solid", "fa-angles-left");
    liBack.append(back);
    listaDePaginas.append(liBack);

    for (let i = 0; i < pedidosPaginados.length; i++) {
      const li = document.createElement("li");
      li.setAttribute("id", "pag-id-" + (i + 1));
      li.innerText = `${i + 1}`;
      listaDePaginas.append(li);

      li.addEventListener("click", (e) => {
        listarPedidosPorCliente(pedidosPaginados[i]);
      });
    }

    const liForward = document.createElement("li");
    const forward = document.createElement("i");
    forward.classList.add("fa-solid", "fa-angles-right");
    liForward.append(forward);
    listaDePaginas.append(liForward);
  }
}

geraPedidos(userData.pedidos.reverse());
