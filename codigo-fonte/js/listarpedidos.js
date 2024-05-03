import Api from "./api.js";
Api.consultaCEP(30550250);
Api.listarUsuarios();

Api.filtrarPedidosPorUser(5);

export async function listarPedidosPorCliente(id) {
  const pedidos = await Api.filtrarPedidosPorUser(id);
  let i = 0;

  while (i < pedidos.lenght()) {
    const listaPedidos = document.getElementById("lisa-de-pedidos-user");

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
    item.setAttribute("id", "id-" + i);
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

    numeroDoPedido.innerText = pedidos.id;
    i++;
  }
}
