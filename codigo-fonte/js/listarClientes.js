import Api from "./api.js";

const userData = JSON.parse(localStorage.getItem("User"));
const listaUsers = JSON.parse(localStorage.getItem("Users"));
const listaPedidos = await Api.listarTodosPedidos();
const userPedidos = listaPedidos.filter((p) => p.fornecedorId === userData.id);

userPedidos.sort((d1, d2) => {
  d1 = new Date(d1.data);
  d2 = new Date(d2.data);

  return d2 - d1;
});

const pedidosPaginados = [];

function listarItensPedido(itensDoPedido, pedidoId) {
  const listaItens = document.getElementById(
    "detalhe-itens-pedido-" + pedidoId
  );

  itensDoPedido.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("detalhe-pedido__item");
    li.innerHTML = `
        <div class="item-nome">
            <div>
                ${item.idItem}
            </div>
            <div>
                ${item.nomeDoItem}
            </div>
        </div>
        
        <div>
            ${item.qtdDoItem}
        </div>`;

    listaItens.append(li);
  });
}

function listarItensPedidoMobile(itensDoPedido, pedidoId) {
  const listaItens = document.getElementById(
    "detalhe-itens-mobile-" + pedidoId
  );

  itensDoPedido.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("detalhe-pedido__item");
    li.innerHTML = `
        <div class="item-nome">
            <div>
                ${item.idItem}
            </div>
            <div>
                ${item.nomeDoItem}
            </div>
        </div>
        
        <div>
            ${item.qtdDoItem}
        </div>`;

    listaItens.append(li);
  });
}

function listaDePedidosMobile(pedidos) {
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

    const cliente = listaUsers.filter((user) => user.id === pedido.clienteId);

    imgUser = cliente[0].imgUrl;
    nomeUser = cliente[0].nome;

    const valor = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(pedido.valor);
    valorPedido = valor;

    const shortOrderId = pedido.id.split("-")[0];

    listaAccordion.innerHTML = `
      <a class="accordion-link" href="#item-mobile-${pedido.id}">
      <div class="lista-pedidos-mobile-ul">
        <ul class="lista-pedidos-mobile-grid">
          <li class="lista-pedido-item-li">
            <div>Número</div>
            <div>${shortOrderId}</div>
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

    const detalhesDoPedido = document.createElement("div");
    detalhesDoPedido.classList.add("detalhe-pedido");
    detalhesDoPedido.innerHTML = `
    <div class="detalhe-pedido__info">
        <section class="coluna-01" id="coluna-01">
            <div>
                <h6>Observações</h6>
                <div class="caixa-obs" id="caixa-obs">
                    ${pedido.observacao}
                </div>
                <div class="message-box">
                    <textarea class="obs-message"></textarea>
                </div>
                <button class="btn-adc-obs" id="btn-adc-obs-${pedido.id}">Enviar observação</button>
            </div>
        </section>

        <section class="coluna-02" id="coluna-02">
            <div>
                <h6>Itens do pedido</h6>
            </div>
            <div>
                <ul id="detalhe-itens-mobile-${pedido.id}" class="detalhe-itens-mobile">
                </ul>
            </div>
        </section>
        <section class="coluna-03" id="coluna-03">
            <div>
                <h6>Prazo de entrega</h6>
                <div>
                    ${pedido.prazoDeEntrega}
                </div>
            </div>
            <div>
                <h6>Endereço de entrega</h6>
                <p>
                  ${pedido.endereco.logradouro}, ${pedido.endereco.numero}
                </p>
                <p>
                  ${pedido.endereco.localidade}/${pedido.endereco.uf} - CEP: ${pedido.endereco.cep}
                </p>
            </div>
        </section>

        <div class="btn-hight" id="btn-hight">
            
            <div class="left-btn">
                <button class="btn-edt-ped" id="btn-add-item-${pedido.id}">Adicionar itens</button>
                <button class="btn-edt-ped" id="btn-edt-ped-${pedido.id}">Editar pedido</button>
                <button class="btn-can-ped" id="btn-can-ped-${pedido.id}">Cancelar pedido</button>
            </div>
        </div>

        <section id="detalhe-pedido__cotacoes-${pedido.id}" class="detalhe-pedido__cotacoes">
        </section>
    </div>`;

    listaAccordion.append(detalhesDoPedido);

    listaPedidosUser.append(listaAccordion);

    listarItensPedidoMobile(pedido.itensDoPedido, pedido.id);
  });
}

function listarPedidosPorCliente(pedidos) {
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

    const cliente = listaUsers.filter((user) => user.id === pedido.clienteId);

    imgUser = cliente[0].imgUrl;
    nomeUser = cliente[0].nome;

    const valor = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(pedido.valor);
    valorPedido = valor;

    const shortOrderId = pedido.id.split("-")[0];

    item.innerHTML = `<a class="accordion-link" href="#pedido-id-${pedido.id}">
      <div class="lista-grid-pedidos">
        <div class="item-lista item-lista-1">${shortOrderId}</div>
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
    detalhesDoPedido.innerHTML = `
    <div class="detalhe-pedido__info">
        <section class="coluna-01" id="coluna-01">
            <div>
                <h6>Observações</h6>
                <div class="caixa-obs" id="caixa-obs">
                    ${pedido.observacao}
                </div>
                <div class="message-box">
                    <textarea class="obs-message"></textarea>
                </div>
            </div>
        </section>

        <section class="coluna-02" id="coluna-02">
            <div>
                <h6>Itens do pedido</h6>
            </div>
            <div>
                <ul id="detalhe-itens-pedido-${pedido.id}" class="detalhe-itens-pedido">
                </ul>
            </div>
        </section>
        <section class="coluna-03" id="coluna-03">
            <div>
                <h6>Prazo de entrega</h6>
                <div>
                    ${pedido.prazoDeEntrega}
                </div>
            </div>
            <div>
                <h6>Endereço de entrega</h6>
                <p>
                  ${pedido.endereco.logradouro}, ${pedido.endereco.numero}
                </p>
                <p>
                  ${pedido.endereco.localidade}/${pedido.endereco.uf} - CEP: ${pedido.endereco.cep}
                </p>
            </div>
        </section>

        <div class="btn-hight" id="btn-hight">
            <button class="btn-adc-obs" id="btn-adc-obs-${pedido.id}">Adicionar observação</button>
            <div class="left-btn">
                <button class="btn-edt-ped" id="btn-add-item-${pedido.id}">Adicionar itens</button>
                <button class="btn-edt-ped" id="btn-edt-ped-${pedido.id}">Editar pedido</button>
                <button class="btn-can-ped" id="btn-can-ped-${pedido.id}">Cancelar pedido</button>
            </div>
        </div>

        <section id="detalhe-pedido__cotacoes-${pedido.id}" class="detalhe-pedido__cotacoes">
        </section>
    </div>`;

    item.append(detalhesDoPedido);

    listaPedidos.appendChild(item);

    listarItensPedido(pedido.itensDoPedido, pedido.id);
  }

  listaDePedidosMobile(pedidos);
}

function paginacaoPedidos(pedidos) {
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

const pedidosEmAbertoBtn = document.getElementById("pedidos-em-aberto");
pedidosEmAbertoBtn.addEventListener("click", (e) => {
  window.location.replace("./pedidosDisponiveis.html");
});

const visualizarClientesBtn = document.getElementById("visualizar-clientes");
visualizarClientesBtn.addEventListener("click", (e) => {
  window.location.replace("./meusClientes.html");
});

geraPedidos(userPedidos);
