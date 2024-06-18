import Api from "./api.js";

const fornecedor = JSON.parse(localStorage.getItem("User"));
const users = JSON.parse(localStorage.getItem("Users"));
const listaCotacoes = JSON.parse(localStorage.getItem("Cotacoes"));
const listaDePedidos = JSON.parse(localStorage.getItem("listaDePedidos"));
const pedidosAbertos = listaDePedidos.filter((p) => p.status == "em aberto");

async function enviarCotacao(cotacao) {
  await Api.cadastrarCotacao(cotacao);
  await Api.listarCotacoes();

  Toastify({
    close: true,
    // duration: 120000,
    text: "Cotação cadastrada!",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00F260, #0575E6)",
    },
  }).showToast();

  setTimeout(() => {
    window.location.reload();
  }, 2500);
}

async function removerCotacao(cotId) {
  await Api.removerCotacao(cotId);
  await Api.listarCotacoes();

  Toastify({
    close: true,
    // duration: 120000,
    text: "Cotação removida com sucesso!",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00F260, #0575E6)",
    },
  }).showToast();

  setTimeout(() => {
    window.location.reload();
  }, 2500);
}

function fecharModal() {
  const modal = document.querySelector(".modal-fornecedor");
  const closeModalBtn = document.querySelectorAll(".close-modal-fornecedor");

  closeModalBtn.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("visible");
    });
  });
}

function criarModal(pedido) {
  const modal = document.querySelector(".modal-fornecedor");
  const enviarBtn = document.getElementById("enviar-cotacao");

  enviarBtn.addEventListener("click", (e) => {
    const valor = document.getElementById("valor-input").value;
    const prazo = document.getElementById("prazo-input").value;
    const observacao = document.getElementById("obs-area").value;

    let id = crypto.randomUUID();

    const cotacao = {
      id: id,
      fornecedorId: fornecedor.id,
      clienteId: pedido.clienteId,
      pedidoId: pedido.id,
      valor: valor,
      prazoDeEntrega: prazo,
      observacao: observacao,
      status: "pendente",
    };

    enviarCotacao(cotacao);
  });

  modal.classList.add("visible");

  fecharModal();
}

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

    const cliente = users.filter((user) => user.id === pedido.clienteId);
    imgUser = cliente[0].imgUrl;
    nomeUser = cliente[0].nome;
    valorPedido = "-";

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

    const minhasCotacoes = listaCotacoes.filter(
      (cot) => cot.fornecedorId === fornecedor.id
    );

    const verificaCotacao = minhasCotacoes.filter(
      (cot) => cot.pedidoId === pedido.id
    );

    let cancelarClass;
    verificaCotacao.length === 0
      ? (cancelarClass = "btn-can-ped")
      : (cancelarClass = "btn-can-ped-null");

    const detalhesDoPedido = document.createElement("div");
    detalhesDoPedido.classList.add("detalhe-pedido");
    detalhesDoPedido.innerHTML = `
        <div class="detalhe-pedido__info" id="det-mobile-${pedido.id}">
            <section class="coluna-01" id="coluna-01">
                <div>
                    <h6>Observações</h6>
                    <ul class="caixa-obs" id="caixa-obs-mobile-${pedido.id}">
                        <li>${pedido.observacao}</li>
                    </ul>
                    <div class="message-box">
                        <textarea id="msg-box-mobile-${pedido.id}" class="obs-message"></textarea>
                    </div>
                    <button class="btn-adc-obs" id="btn-adc-obs-mobile-${pedido.id}">Enviar observação</button>
                </div>
            </section>
    
            <section class="coluna-02" id="coluna-02">
                <div>
                    <h6>Itens do pedido</h6>
                </div>
                <div>
                    <ul id="detalhe-itens-mobile-${pedido.id}" class="detalhe-itens-pedido">
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
                    
                    <button class="${cancelarClass}" id="btn-env-cot-mobile-${pedido.id}">Enviar cotação</button>
                </div>
            </div>
    
            <section id="detalhe-pedido__cotacoes-${pedido.id}" class="detalhe-pedido__cotacoes">
            </section>
        </div>`;

    listaAccordion.append(detalhesDoPedido);

    listaPedidosUser.append(listaAccordion);

    listarItensPedidoMobile(pedido.itensDoPedido, pedido.id);

    const enviarCotBtn = document.getElementById(
      "btn-env-cot-mobile-" + pedido.id
    );
    enviarCotBtn.addEventListener("click", (e) => {
      criarModal(pedido);
    });

    document
      .getElementById(`btn-adc-obs-mobile-${pedido.id}`)
      .addEventListener("click", (e) => {
        const textarea = document.getElementById("msg-box-mobile-" + pedido.id);
        const obsBox = document.getElementById("caixa-obs-mobile-" + pedido.id);
        const msgBox = document.createElement("li");

        msgBox.innerText = textarea.value;
        obsBox.append(msgBox);
        textarea.value = "";

        if (fornecedor.id == pedido.clienteId) {
          msgBox.classList.add("my-msg");
        }
      });

    const detalhe = document.getElementById("det-mobile-" + pedido.id);
    if (!(verificaCotacao.length === 0)) {
      enviarCotBtn.disabled = true;
      const cotacoes = document.createElement("div");
      const titulo = document.createElement("h4");
      const listaCotacoes = document.createElement("ul");

      titulo.innerText = "Cotação enviada";
      cotacoes.classList.add("minhas-cotacoes");

      const liCotacao = document.createElement("li");

      const shortCotId = verificaCotacao[0].id.split("-")[0];
      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(verificaCotacao[0].valor);

      liCotacao.classList.add("li-cotacao");
      liCotacao.innerHTML = `
            <div class="lista-grid-cotacoes">
              <div class="item-lista cotacao-1">
                ${shortCotId}
              </div>
              <div class="item-fornecedor item-lista cotacao-2">
                <div class="icon-fornecedor">
                  <img src="${fornecedor.imgUrl}" alt="${fornecedor.nome}" />
                </div>
                <span class="nome-fornecedor">${fornecedor.nome}</span>
              </div>
              <div class="item-lista cotacao-3">
                ${valor}
              </div>
              <div class="item-lista cotacao-4">
                ${verificaCotacao[0].prazoDeEntrega}
              </div>
              <div class="item-lista cotacao-5">
                ${verificaCotacao[0].status}
              </div>
              <div class="item-lista cotacao-6"></div>
              <div class="item-lista cotacao-7">
                <button class="btn-can-cot" id="btn-rmv-cot-mobile-${verificaCotacao[0].id}">Remover</button>
              </div>
            </div>`;

      listaCotacoes.append(liCotacao);

      cotacoes.append(titulo, listaCotacoes);

      detalhe.append(cotacoes);

      const removerBtn = document.getElementById(
        "btn-rmv-cot-mobile-" + verificaCotacao[0].id
      );

      removerBtn.addEventListener("click", (e) => {
        removerCotacao(verificaCotacao[0].id);
      });
    }
  });
}

export async function listarPedidosEmAberto(pedidos) {
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

    const cliente = users.filter((user) => user.id === pedido.clienteId);
    imgUser = cliente[0].imgUrl;
    nomeUser = cliente[0].nome;
    valorPedido = "-";

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

    const minhasCotacoes = listaCotacoes.filter(
      (cot) => cot.fornecedorId === fornecedor.id
    );

    const verificaCotacao = minhasCotacoes.filter(
      (cot) => cot.pedidoId === pedido.id
    );

    let cancelarClass;
    verificaCotacao.length === 0
      ? (cancelarClass = "btn-can-ped")
      : (cancelarClass = "btn-can-ped-null");

    const detalhesDoPedido = document.createElement("div");
    detalhesDoPedido.classList.add("detalhe-pedido");
    detalhesDoPedido.innerHTML = `
      <div class="detalhe-pedido__info" id="detalhe-${pedido.id}">
          <section class="coluna-01" id="coluna-01">
              <div>
                  <h6>Observações</h6>
                  <ul class="caixa-obs" id="caixa-obs-${pedido.id}">
                      <li>${pedido.observacao}</li>
                  </ul>
                  <div class="message-box">
                      <textarea id="msg-box-${pedido.id}" class="obs-message"></textarea>
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
                  
                  <button class="${cancelarClass}" id="btn-env-cot-${pedido.id}">Enviar cotação</button>
              </div>
          </div>
  
          <section id="detalhe-pedido__cotacoes-${pedido.id}" class="detalhe-pedido__cotacoes">
          </section>
      </div>`;

    item.append(detalhesDoPedido);

    listaPedidos.appendChild(item);

    listarItensPedido(pedido.itensDoPedido, pedido.id);

    const enviarCotBtn = document.getElementById("btn-env-cot-" + pedido.id);
    enviarCotBtn.addEventListener("click", (e) => {
      criarModal(pedido);
    });

    document
      .getElementById(`btn-adc-obs-${pedido.id}`)
      .addEventListener("click", (e) => {
        const textarea = document.getElementById("msg-box-" + pedido.id);
        const obsBox = document.getElementById("caixa-obs-" + pedido.id);
        const msgBox = document.createElement("li");

        msgBox.innerText = textarea.value;
        obsBox.append(msgBox);
        textarea.value = "";

        if (userData.id == pedido.clienteId) {
          msgBox.classList.add("my-msg");
        }
      });

    const detalhe = document.getElementById("detalhe-" + pedido.id);

    if (!(verificaCotacao.length === 0)) {
      enviarCotBtn.disabled = true;
      const cotacoes = document.createElement("div");
      const titulo = document.createElement("h4");
      const listaCotacoes = document.createElement("ul");

      titulo.innerText = "Cotação enviada";
      cotacoes.classList.add("minhas-cotacoes");

      const liCotacao = document.createElement("li");

      const shortCotId = verificaCotacao[0].id.split("-")[0];
      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(verificaCotacao[0].valor);

      liCotacao.classList.add("li-cotacao");
      liCotacao.innerHTML = `
            <div class="lista-grid-cotacoes">
              <div class="item-lista cotacao-1">
                ${shortCotId}
              </div>
              <div class="item-fornecedor item-lista cotacao-2">
                <div class="icon-fornecedor">
                  <img src="${fornecedor.imgUrl}" alt="${fornecedor.nome}" />
                </div>
                <span class="nome-fornecedor">${fornecedor.nome}</span>
              </div>
              <div class="item-lista cotacao-3">
                ${valor}
              </div>
              <div class="item-lista cotacao-4">
                ${verificaCotacao[0].prazoDeEntrega}
              </div>
              <div class="item-lista cotacao-5">
                ${verificaCotacao[0].status}
              </div>
              <div class="item-lista cotacao-6"></div>
              <div class="item-lista cotacao-7">
                <button class="btn-can-cot" id="btn-rmv-cot-${verificaCotacao[0].id}">Remover</button>
              </div>
            </div>`;

      listaCotacoes.append(liCotacao);

      cotacoes.append(titulo, listaCotacoes);

      detalhe.append(cotacoes);

      const removerBtn = document.getElementById(
        "btn-rmv-cot-" + verificaCotacao[0].id
      );

      removerBtn.addEventListener("click", (e) => {
        removerCotacao(verificaCotacao[0].id);
      });
    }
  }

  listaDePedidosMobile(pedidos);
}

listarPedidosEmAberto(pedidosAbertos);
