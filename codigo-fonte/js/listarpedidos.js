import Api from "./api.js";

const userData = JSON.parse(localStorage.getItem("User"));
const listaPedidos = JSON.parse(localStorage.getItem("listaDePedidos"));
const listaCotacoes = JSON.parse(localStorage.getItem("Cotacoes"));
const userPedidos = listaPedidos.filter((p) => p.clienteId === userData.id);

userPedidos.sort((d1, d2) => {
  d1 = new Date(d1.data);
  d2 = new Date(d2.data);

  return d2 - d1;
});

const pedidosPaginados = [];

async function editarPedidos(dadosPedido, pedidoId) {
  await Api.editarPedido(dadosPedido, pedidoId);
  await Api.listarTodosPedidos();
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

async function alterarCotacao(status, cotacaoId) {
  await Api.editarCotacao(status, cotacaoId);
  await Api.listarCotacoes();
}

async function alterarTodasCotacoes(cotacaoAceita, pedidoId) {
  listaCotacoes.forEach((cotacao) => {
    if (cotacao.id !== cotacaoAceita.id && cotacao.pedidoId === pedidoId) {
      const newStatus = {
        status: "recusada",
      };
      Api.editarCotacao(newStatus, cotacao.id);
    }
  });
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

  if (pedidos === undefined) {
    const aviso = document.createElement("div");
    aviso.innerText = "Nenhum pedido encontrado";
    listaPedidosUser.append(aviso);
  } else {
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

      const listaUsers = JSON.parse(localStorage.getItem("Users"));

      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(pedido.valor);
      valorPedido = valor;

      if (pedido.fornecedorId !== null) {
        const fornecedor = listaUsers.filter(
          (user) => user.id == pedido.fornecedorId
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

      let cancelarClass;
      pedido.status == "em aberto"
        ? (cancelarClass = "btn-can-ped")
        : (cancelarClass = "btn-can-ped-null");

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
      <div class="detalhe-pedido__info" id="detalhe-mobile-${pedido.id}">
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
                  <button class="${cancelarClass}" id="btn-can-ped-mobile-${pedido.id}">Cancelar pedido</button>
              </div>
          </div>
  
          <section id="detalhe-pedido__cotacoes-${pedido.id}" class="detalhe-pedido__cotacoes">
          </section>
      </div>`;

      listaAccordion.append(detalhesDoPedido);

      listaPedidosUser.append(listaAccordion);

      listarItensPedidoMobile(pedido.itensDoPedido, pedido.id);

      const detalhe = document.getElementById("detalhe-mobile-" + pedido.id);

      const findCotacoes = listaCotacoes.filter(
        (cot) => cot.pedidoId === pedido.id
      );

      if (findCotacoes.length > 0) {
        const cotacoes = document.createElement("div");
        const titulo = document.createElement("h4");
        const listaCotacoes = document.createElement("ul");

        titulo.innerText = "Cotações recebidas";
        cotacoes.classList.add("minhas-cotacoes");

        const cotacaoAceita = findCotacoes.find((e) => e.status == "aceita");

        let classAceitar = "btn-aceita";
        let classRecusar = "btn-recusa";

        if (cotacaoAceita !== undefined) {
          classAceitar = "btn-aceita-disabled";
          classRecusar = "btn-recusa-disabled";
        }

        findCotacoes.forEach((cotacao) => {
          const liCotacao = document.createElement("li");
          const cotFornecedor = JSON.parse(
            localStorage.getItem("Fornecedores")
          ).filter((f) => f.id == cotacao.fornecedorId);

          const shortCotId = cotacao.id.split("-")[0];

          if (cotacao.status == "recusada") {
            classAceitar = "btn-aceita-disabled";
            classRecusar = "btn-recusa-disabled";
          }

          liCotacao.classList.add("li-cotacao");
          liCotacao.innerHTML = `
          <div class="lista-grid-cotacoes">
            <div class="item-lista cotacao-1">
              ${shortCotId}
            </div>
            <div class="item-fornecedor item-lista cotacao-2">
              <div class="icon-fornecedor">
                <img src="${cotFornecedor[0].imgUrl}" alt="${cotFornecedor[0].nome}" />
              </div>
              <span class="nome-fornecedor">${cotFornecedor[0].nome}</span>
            </div>
            <div class="item-lista cotacao-3">
              ${cotacao.valor}
            </div>
            <div class="item-lista cotacao-4">
              ${cotacao.prazoDeEntrega}
            </div>
            <div class="item-lista cotacao-5">
              Aceita
            </div>
            <div class="item-lista cotacao-6">
              <button class="${classAceitar}">Aceitar</button>
            </div>
            <div class="item-lista cotacao-7">
              <button class="${classRecusar}">Recusar</button>
            </div>
          </div>`;

          listaCotacoes.append(liCotacao);
        });

        cotacoes.append(titulo, listaCotacoes);

        detalhe.append(cotacoes);
      }

      findCotacoes.forEach((c) => {
        const cotacaoAceita = findCotacoes.find((e) => e.status == "aceita");
        const actCotBtn = document.getElementById("act-cot-btn-" + c.id);

        actCotBtn.addEventListener("click", (e) => {
          const status = {
            status: "aceita",
          };

          const novoPedidoEdit = {
            fornecedorId: c.fornecedorId,
            valor: c.valor,
            status: "aguardando envio",
          };

          alterarCotacao(status, c.id);
          alterarTodasCotacoes(c, pedido.id);
          editarPedidos(novoPedidoEdit, pedido.id);
        });

        const recCotBtn = document.getElementById("rec-cot-btn-" + c.id);
        recCotBtn.addEventListener("click", (e) => {
          const status = {
            status: "recusada",
          };

          alterarCotacao(status, c.id);
        });

        if (cotacaoAceita !== undefined || c.status == "recusada") {
          actCotBtn.disabled = true;
          recCotBtn.disabled = true;
        }
      });

      if (pedido.status !== "em aberto") {
        document.getElementById("btn-can-ped-" + pedido.id).disabled = true;
      } else {
        const cancelarBtn = document.getElementById("btn-can-ped-" + pedido.id);
        cancelarBtn.addEventListener("click", (e) => {
          const statusObj = {
            status: "cancelado",
          };
          editarPedidos(statusObj, pedido.id);
        });
      }

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
    });
  }
}

export async function listarPedidosPorCliente(pedidos) {
  const listaPedidos = document.getElementById("lista-de-pedidos-user");
  while (listaPedidos.firstChild) {
    listaPedidos.removeChild(listaPedidos.firstChild);
  }

  if (pedidos === undefined) {
    const aviso = document.createElement("div");
    aviso.innerText = "Nenhum pedido encontrado";
    listaPedidos.append(aviso);
  } else {
    for (const pedido of pedidos) {
      const item = document.createElement("div");
      let imgUser, nomeUser, valorPedido;

      item.classList.add("accordion-list-item");
      item.setAttribute("id", "pedido-id-" + pedido.id);
      let cancelarClass;
      pedido.status == "em aberto"
        ? (cancelarClass = "btn-can-ped")
        : (cancelarClass = "btn-can-ped-null");

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
                  
                  <button class="${cancelarClass}" id="btn-can-ped-${pedido.id}">Cancelar pedido</button>
              </div>
          </div>
  
          <section id="detalhe-pedido__cotacoes-${pedido.id}" class="detalhe-pedido__cotacoes">
          </section>
      </div>`;

      item.append(detalhesDoPedido);

      listaPedidos.appendChild(item);

      listarItensPedido(pedido.itensDoPedido, pedido.id);

      const detalhe = document.getElementById("detalhe-" + pedido.id);

      const findCotacoes = listaCotacoes.filter(
        (cot) => cot.pedidoId === pedido.id
      );

      if (findCotacoes.length > 0) {
        const cotacoes = document.createElement("div");
        const titulo = document.createElement("h4");
        const listaCotacoes = document.createElement("ul");

        titulo.innerText = "Cotações recebidas";
        cotacoes.classList.add("minhas-cotacoes");

        const cotacaoAceita = findCotacoes.find((e) => e.status == "aceita");

        let classAceitar = "btn-aceita";
        let classRecusar = "btn-recusa";

        if (cotacaoAceita !== undefined) {
          classAceitar = "btn-aceita-disabled";
          classRecusar = "btn-recusa-disabled";
        }

        findCotacoes.forEach((cotacao) => {
          const liCotacao = document.createElement("li");
          const cotFornecedor = JSON.parse(
            localStorage.getItem("Fornecedores")
          ).filter((f) => f.id == cotacao.fornecedorId);

          liCotacao.classList.add("li-cotacao");

          const shortCotId = cotacao.id.split("-")[0];

          if (cotacao.status == "recusada") {
            classAceitar = "btn-aceita-disabled";
            classRecusar = "btn-recusa-disabled";
          }

          const valorCotacao = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(cotacao.valor);

          liCotacao.innerHTML = `
          <div class="lista-grid-cotacoes">
            <div class="item-lista cotacao-1">
              ${shortCotId}
            </div>
            <div class="item-fornecedor item-lista cotacao-2">
              <div class="icon-fornecedor">
                <img src="${cotFornecedor[0].imgUrl}" alt="${cotFornecedor[0].nome}" />
              </div>
              <span class="nome-fornecedor">${cotFornecedor[0].nome}</span>
            </div>
            <div class="item-lista cotacao-3">
              ${valorCotacao}
            </div>
            <div class="item-lista cotacao-4">
              ${cotacao.prazoDeEntrega}
            </div>
            <div class="item-lista cotacao-5">
              ${cotacao.status}
            </div>
            <div class="item-lista cotacao-6">
              <button class="${classAceitar}" id="act-cot-btn-${cotacao.id}">Aceitar</button>
            </div>
            <div class="item-lista cotacao-7">
              <button class="${classRecusar}" id="rec-cot-btn-${cotacao.id}">Recusar</button>
            </div>
          </div>`;

          listaCotacoes.append(liCotacao);
        });

        cotacoes.append(titulo, listaCotacoes);

        detalhe.append(cotacoes);
      }

      findCotacoes.forEach((c) => {
        const cotacaoAceita = findCotacoes.find((e) => e.status == "aceita");
        const actCotBtn = document.getElementById("act-cot-btn-" + c.id);

        actCotBtn.addEventListener("click", (e) => {
          const status = {
            status: "aceita",
          };

          const novoPedidoEdit = {
            fornecedorId: c.fornecedorId,
            valor: c.valor,
            status: "aguardando envio",
          };

          alterarCotacao(status, c.id);
          alterarTodasCotacoes(c, pedido.id);
          editarPedidos(novoPedidoEdit, pedido.id);
        });

        const recCotBtn = document.getElementById("rec-cot-btn-" + c.id);
        recCotBtn.addEventListener("click", (e) => {
          const status = {
            status: "recusada",
          };

          alterarCotacao(status, c.id);
        });

        if (cotacaoAceita !== undefined || c.status == "recusada") {
          actCotBtn.disabled = true;
          recCotBtn.disabled = true;
        }
      });

      if (pedido.status !== "em aberto") {
        document.getElementById("btn-can-ped-" + pedido.id).disabled = true;
      } else {
        const cancelarBtn = document.getElementById("btn-can-ped-" + pedido.id);
        cancelarBtn.addEventListener("click", (e) => {
          const statusObj = {
            status: "cancelado",
          };
          editarPedidos(statusObj, pedido.id);
        });
      }

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
    }
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

geraPedidos(userPedidos);

document
  .getElementById("btn-meus-fornecedores")
  .addEventListener("click", (e) => {
    window.location.replace("./meusFornecedores.html");
  });

const inputBusca = document.getElementById("busca");
inputBusca.onkeyup = function () {
  const novosPedidos = userPedidos.filter((p) =>
    p.id.includes(inputBusca.value)
  );

  inputBusca.value === ""
    ? geraPedidos(userPedidos)
    : geraPedidos(novosPedidos);
};
