import Api from "./api.js";

const userData = JSON.parse(localStorage.getItem("User"));

export async function listarPedidosPorCliente(id) {
  const pedidos = await Api.filtrarPedidosPorUser(id);

  for (const pedido of pedidos) {
    const listaPedidos = document.getElementById("lista-de-pedidos-user");

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
    dataDoPedido.innerText = pedido.data;

    if (pedido.fornecedorId !== null) {
      const fornecedor = await Api.listarUsuariosPorId(pedido.fornecedorId);
      imgUser.src = fornecedor[0].imgUrl;
      nomeUser.innerText = fornecedor[0].nome;
      valorPedido.innerText = `R$ ${pedido.valor}`;
    } else {
      imgUser.src = "./img/empty-fornecedor.png";
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

listarPedidosPorCliente(userData.id);
