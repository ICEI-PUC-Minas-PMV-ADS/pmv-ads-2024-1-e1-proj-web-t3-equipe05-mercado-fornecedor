import Api from "./api.js";

const userData = JSON.parse(localStorage.getItem("User"));
const pedidosLista = await Api.filtrarPedidosPorUser(userData.id);
const pedidosPaginados = [];

async function listaDePedidosMobile(pedidos) {
  const listaPedidosUser = document.getElementById(
    "lista-de-pedidos-user-mobile"
  );
  pedidos.forEach((pedido) => {
    const listaAccordion = document.createElement("div");
    let imgUser;
    let nomeUser;
    let valorPedido;

    listaAccordion.classList.add("accordion-list-item");
    listaAccordion.setAttribute("id", "item-mobile-" + pedido.id);

    const data = new Date(pedido.data);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    if (pedido.fornecedorId !== null) {
      const listaFornecedores = JSON.parse(localStorage.getItem("Users"));
      const fornecedor = listaFornecedores.filter(
        (fornecedor) => fornecedor.id === pedido.fornecedorId
      );
      imgUser = fornecedor[0].imgUrl;
      nomeUser = fornecedor[0].nome;
      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(pedido.valor);
      valorPedido = valor;
    } else {
      imgUser = "./img/defaultUser.png";
      nomeUser = "Indefinido";
      valorPedido = "-";
    }

    listaAccordion.innerHTML = `
      <a class="accordion-link" href="#item-mobile-${pedido.id}">
      <div class="lista-pedidos-mobile-ul">
        <ul class="lista-pedidos-mobile-grid">
          <li class="lista-pedido-item-li">
            <div>Número</div>
            <div>${pedido.id}</div>
          </li>
          <li class="lista-pedido-item-li">
            <div>Data</div>
            <div>${dia}/${mes}/${ano}</div>
          </li>
          <li class="lista-pedido-item-li">
            <div>Fornecedor</div>
            <div class="fornecedor-detalhe">
              <img src="${imgUser}" alt="${nomeUser}" />
              <p>${nomeUser}</p>
            </div>
          </li>
          <li class="lista-pedido-item-li">
            <div>Valor</div>
            <div>${valorPedido}</div>
          </li>
          <li class="lista-pedido-item-li">
            <div>Status</div>
            <div>${pedido.status}</div>
          </li>
          <li class="lista-pedido-item-li">
            <div><button class="btn-mais">Ver mais</button></div>
          </li>
        </ul>
      </div>
    </a>`;

    listaPedidosUser.append(listaAccordion);
  });
}

export async function listarPedidosPorCliente(pedidos) {
  const listaPedidos = document.getElementById("lista-de-pedidos-user");
  while (listaPedidos.firstChild) {
    listaPedidos.removeChild(listaPedidos.firstChild);
  }

  for (const pedido of pedidos) {
    const item = document.createElement("div");
    let imgUser, nomeUser, valorPedido;

    item.classList.add("accordion-list-item");
    item.setAttribute("id", "pedido-id-" + pedido.id);

    const data = new Date(pedido.data);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    if (pedido.fornecedorId !== null) {
      const fornecedor = await Api.listarUsuariosPorId(pedido.fornecedorId);
      imgUser = fornecedor[0].imgUrl;
      nomeUser = fornecedor[0].nome;
      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(pedido.valor);
      valorPedido = valor;
    } else {
      imgUser = "./img/defaultUser.png";
      nomeUser = "Indefinido";
      valorPedido = "-";
    }

    item.innerHTML = `<a class="accordion-link" href="#pedido-id-${pedido.id}">
      <div class="lista-grid-pedidos">
        <div class="item-lista item-lista-1">${pedido.id}</div>
        <div class="item-lista item-lista-2">${dia}/${mes}/${ano}</div>
        <div class="item-fornecedor item-lista item-lista-3">
          <div class="icon-fornecedor">
            <img src="${imgUser}" alt="${nomeUser}" />
          </div>
          <span class="nome-fornecedor">${nomeUser}</span>
        </div>
        <div class="item-lista item-lista-4">${valorPedido}</div>
        <div class="item-lista item-lista-5">${pedido.status}</div>
        <div class="item-lista item-lista-6">
          <button class="btn-mais">Ver mais</button>
        </div>
      </div>
    </a>`;

    const detalhesDoPedido = document.createElement("div");
    detalhesDoPedido.classList.add("detalhe-pedido");
    detalhesDoPedido.innerHTML = `<div class="detalhe-pedido">
      <section class="coluna-01" id="coluna-01">
        <div>
          <h6>Observações:</h6>
        </div>
        <div class="caixa-obs" id="caixa-obs">
        ${pedido.observacao}
        </div>
      </section>
      <section class="coluna-02" id="coluna-02">
        <div>
          <h6>Itens do pedido:</h6>
        </div>
        <div>
          <ul>
            <li>01 - Lorem ipsum - 50ml  .......  R$150,00</li>
            <li>01 - Lorem ipsum - 50ml  .......  R$150,00</li>
            <li>01 - Lorem ipsum - 50ml  .......  R$150,00</li>
            <li>01 - Lorem ipsum - 50ml  .......  R$150,00</li>
            <li>01 - Lorem ipsum - 50ml  .......  R$150,00</li>
            <li>01 - Lorem ipsum - 50ml  .......  R$150,00</li>
          </ul>
        </div>
      </section>
      <section class="coluna-03" id="coluna-03">
        <div>
          <h6>Endereço de entrega:</h6>
        </div>
        <div>
        Praça da Matriz, n° 50, Belo Horizonte - MG
        </div>
      </section>

      <button class="btn-adc-obs" id="btn-adc-obs">Adicionar observação</button>
      <div class="btn-hight" id="btn-hight">
        <button class="btn-edt-ped" id="btn-edt-ped">Adicionar itens</button>
        <button class="btn-edt-ped" id="btn-edt-ped">Editar pedido</button>
        <button class="btn-can-ped" id="btn-can-ped">Cancelar pedido</button>
      </div>
    </div>`;

    item.append(detalhesDoPedido);

    listaPedidos.appendChild(item);
  }

  listaDePedidosMobile(pedidos);
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


    
    

filtro.onkeyup = function(){
  const pedidosFiltrados = userData.pedidos.forEach((p) => p.id == Number(filtro.value));
geraPedidos(pedidosFiltrados);
}







