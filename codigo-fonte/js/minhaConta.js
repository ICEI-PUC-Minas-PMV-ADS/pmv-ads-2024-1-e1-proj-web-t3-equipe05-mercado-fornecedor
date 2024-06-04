import Api from "./api.js";

const user = JSON.parse(localStorage.getItem("User"));
const verPedidos = document.getElementById("visualizar-pedidos");
const meusFornecedores = document.getElementById("meus-fornecedores");
const salvarBtn = document.getElementById("minha-conta__salvar-btn");
const editarDadosBtn = document.getElementById("editar-dados");
const estatisticasBtn = document.getElementById("estatisticas");
const notificacoesBtn = document.getElementById("notificacoes");

function logout() {

  localStorage.clear();
  sessionStorage.clear();

  window.location.href = "/codigo-fonte/login.html";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("logout").addEventListener("click", logout);
});


const objPedidosPorAno = {};
const arrayPedidosPorAno = [];


// BUSCA ENDEREÇO PELO CEP E PREENCHE AUTOMATICAMENTE OS INPUTS
const btnCepCadastro = document.getElementById("buscar-btn-cep-cadastro");
const objEndereco = {};

const exibirEndereco = (endereco) => {
  console.log(endereco);
  for (const campo in endereco) {
    if (document.getElementById(campo)) {
      let input = document.getElementById(campo);
      input.value = endereco[campo];
      objEndereco[campo] = endereco[campo];
    }
  }

  objEndereco.cep = endereco.cep;
};

btnCepCadastro.addEventListener("click", (e) => {
  const cepCadastro = document.getElementById("minha-conta__cep");
  let cep = cepCadastro.value.replace("-", "");

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

function verificaTipoDeUsuario() {
  const paginaFornecedores = document.getElementById("meus-fornecedores");

  if (user.tipo === "fornecedor") {
    paginaFornecedores.innerHTML = `<span class="material-symbols-outlined"> hub </span>
    <span>Meus clientes</span>`;

    paginaFornecedores.addEventListener("click", (e) => {
      window.location.replace("./meusClientes.html");
    });

    verPedidos.addEventListener("click", (e) => {
      window.location.replace("./painelDeControleFornecedor.html");
    });
  } else {
    paginaFornecedores.innerHTML = `<span class="material-symbols-outlined"> hub </span>
    <span>Meus fornecedores</span>`;

    verPedidos.addEventListener("click", (e) => {
      window.location.replace("./painelDeControleCliente.html");
    });
  }
}

function exibirDadosDoUsuario() {
  const user = JSON.parse(localStorage.getItem("User"));

  const nome = document.getElementById("minha-conta__nome");
  const cnpj = document.getElementById("minha-conta__cnpj");
  const cep = document.getElementById("minha-conta__cep");
  const rua = document.getElementById("logradouro");
  const complemento = document.getElementById("minha-conta__complemento");
  const bairro = document.getElementById("bairro");
  const numero = document.getElementById("minha-conta__numero");
  const cidade = document.getElementById("localidade");
  const estado = document.getElementById("uf");
  const segmento = document.getElementById("minha-conta__segmento");
  const telefone = document.getElementById("minha-conta__telefone");
  const email = document.getElementById("minha-conta__email");

  const userImgContainer = document.getElementById("minha-conta__user-logo");
  const userName = document.getElementById("minha-conta__user-name");
  const userTipo = document.getElementById("minha-conta__user-tipo");

  const userImg = document.createElement("img");

  const tipo = user.tipo.charAt(0).toUpperCase() + user.tipo.slice(1);

  userImg.src = user.imgUrl;
  userName.innerText = user.nome;
  userTipo.innerText = tipo;

  userImgContainer.append(userImg);

  nome.value = user.nome;
  cnpj.value = user.cnpj;
  email.value = user.email;

  if (user.endereco !== null) {
    cep.value = user.endereco.cep;
    rua.value = user.endereco.logradouro;
    complemento.value = user.endereco.complemento;
    bairro.value = user.endereco.bairro;
    numero.value = user.endereco.numero;
    cidade.value = user.endereco.localidade;
    estado.value = user.endereco.uf;
  }

  if (user.segmento !== null) segmento.value = user.segmento;
  if (user.telefone !== null) telefone.value = user.telefone;
}

function editarDadosDoUsuario() {
  const user = JSON.parse(localStorage.getItem("User"));

  // const nome = document.getElementById("minha-conta__nome").value;
  // const cnpj = document.getElementById("minha-conta__cnpj").value;
  const cep = document.getElementById("minha-conta__cep").value;
  const complemento = document.getElementById("minha-conta__complemento").value;
  const numero = document.getElementById("minha-conta__numero").value;
  const segmento = document.getElementById("minha-conta__segmento").value;
  const telefone = document.getElementById("minha-conta__telefone").value;
  const email = document.getElementById("minha-conta__email").value;
  const senha = document.getElementById("minha-conta__senha").value;

  let objUser = {};

  if (user.endereco == null) {
    console.log(objEndereco);
    objEndereco.complemento = complemento;
    objEndereco.numero = numero;

    objUser = {
      endereco: objEndereco,
    };
  } else if (cep !== user.endereco.cep && cep != "") {
    objEndereco.complemento = complemento;
    objEndereco.numero = numero;

    objUser = {
      endereco: objEndereco,
    };
  }

  if (segmento !== "") objUser.segmento = segmento;
  if (telefone !== "") objUser.telefone = telefone;
  if (email !== "") objUser.email = email;
  if (senha !== "") objUser.password = senha;

  Api.editarUsuario(objUser, user.id);
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

function listarPedidosEmAberto() {
  const pedidosEmAberto = user.pedidos.filter(
    (pedido) => pedido.status === "em aberto"
  );

  pedidosEmAberto.reverse().forEach((pedido) => {
    const lista = document.getElementById("minha-conta__lista-pedidos");

    const listaItem = document.createElement("li");
    const containerItem = document.createElement("div");
    const numeroPedido = document.createElement("div");
    const dataPedido = document.createElement("div");
    const containerFornecedor = document.createElement("div");
    const containerImgFornecedor = document.createElement("div");
    const imgFornecedor = document.createElement("img");
    const nomeFornecedor = document.createElement("span");
    const valorPedido = document.createElement("div");
    const statusPedido = document.createElement("div");
    const verMaisBtn = document.createElement("button");

    listaItem.classList.add("minha-conta__lista-pedidos-item");
    containerItem.classList.add("minha-conta__lista-pedidos-grid");
    numeroPedido.classList.add("item-lista", "item-lista-1");
    dataPedido.classList.add("item-lista", "item-lista-2");
    containerFornecedor.classList.add(
      "item-fornecedor",
      "item-lista",
      "item-lista-3"
    );
    containerImgFornecedor.classList.add("icon-fornecedor");
    nomeFornecedor.classList.add("nome-fornecedor");
    valorPedido.classList.add("item-lista", "item-lista-4");
    statusPedido.classList.add("item-lista", "item-lista-5");
    verMaisBtn.classList.add("btn-mais");

    const data = new Date(pedido.data);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    numeroPedido.innerText = pedido.id;
    dataPedido.innerText = `${dia}/${mes}/${ano}`;
    imgFornecedor.src = "https://i.ibb.co/ydQxnbG/default-User.png";
    nomeFornecedor.innerText = "Indefinido";
    valorPedido.innerText = "-";
    statusPedido.innerText = pedido.status;
    verMaisBtn.innerText = "Ver mais";

    containerImgFornecedor.append(imgFornecedor);
    containerFornecedor.append(containerImgFornecedor, nomeFornecedor);

    containerItem.append(
      numeroPedido,
      dataPedido,
      containerFornecedor,
      valorPedido,
      statusPedido,
      verMaisBtn
    );
    listaItem.append(containerItem);
    lista.append(listaItem);
  });

  listaDePedidosMobile(pedidosEmAberto);
}

function listarConteudo(
  e,
  openTab,
  closedTab1,
  closedTab2,
  activeBtn,
  disabledBtn1,
  disabledBtn2
) {
  closedTab1.style.display = "none";
  closedTab2.style.display = "none";
  openTab.style.display = "block";

  activeBtn.className = "minha-conta__menu-item minha-conta__menu-item--active";
  disabledBtn1.className =
    "minha-conta__menu-item minha-conta__menu-item--disabled";
  disabledBtn2.className =
    "minha-conta__menu-item minha-conta__menu-item--disabled";
}

function filtrarPedidosAnuais(anoAtual) {
  const pedidosPorMes = {};

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  for (let i = 0; i < 12; i++) {
    let pedidosFinalizados = 0;
    let pedidosEmAberto = 0;
    let valorTotal = 0;
    const pedidosDoMes = user.pedidos.filter((pedido) => {
      const dataDoPedido = new Date(pedido.data);
      return (
        dataDoPedido.getMonth() == i && dataDoPedido.getFullYear() == anoAtual
      );
    });

    if (pedidosDoMes.length !== 0) {
      pedidosDoMes.forEach((pedido) => {
        if (pedido.valor) {
          valorTotal += pedido.valor;
        }
        pedido.status === "em aberto"
          ? pedidosEmAberto++
          : pedidosFinalizados++;
      });

      const statsMes = {
        ano: anoAtual,
        mes: meses[i],
        total: valorTotal,
        pedidosEmAberto: pedidosEmAberto,
        pedidosFinalizados: pedidosFinalizados,
      };

      pedidosPorMes[i] = statsMes;
    }
  }

  return pedidosPorMes;
}

function listarTabelaPedidosPorMes(ano) {
  const pedidosPorMes = filtrarPedidosAnuais(ano);
  const meses = Object.values(pedidosPorMes).reverse();
  const table = document.getElementById("minha-conta__table-custo");
  const tituloValor = document.getElementById("minha-conta__tabela-valor");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  meses.forEach((mes) => {
    const row = document.createElement("tr");
    const colunaMes = document.createElement("td");
    const colunaFinalizados = document.createElement("td");
    const colunaAbertos = document.createElement("td");
    const colunaTotal = document.createElement("td");

    const valorTotal = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(mes.total);

    colunaMes.innerText = `${mes.mes}/${ano}`;
    colunaFinalizados.innerText = `${mes.pedidosFinalizados} pedidos`;
    colunaAbertos.innerText = `${mes.pedidosEmAberto} pedidos`;
    colunaTotal.innerText = valorTotal;

    user.tipo === "cliente"
      ? (tituloValor.innerText = "Custo")
      : (tituloValor.innerText = "Faturamento");

    row.append(colunaMes, colunaFinalizados, colunaAbertos, colunaTotal);
    table.append(row);
  });
}

function filtrarAnosDosPedidos() {
  const arrDatas = [];

  user.pedidos.forEach((pedido) => {
    const dataDoPedido = new Date(pedido.data);
    arrDatas.push(dataDoPedido.getFullYear());
  });

  return [...new Set(arrDatas)];
}

function filtrarPedidosPorAno() {
  const arrDatas = filtrarAnosDosPedidos();
  const listaDeCategorias = document.getElementById(
    "minha-conta__dropdown-list"
  );

  arrDatas.reverse().forEach((ano) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.classList.add("dropdown-item");
    a.href = "#";
    a.innerText = ano;
    a.value = ano;

    li.appendChild(a);
    listaDeCategorias.appendChild(li);

    li.addEventListener("click", (e) => {
      listarTabelaPedidosPorMes(a.value);
    });

    objPedidosPorAno[ano] = filtrarPedidosAnuais(ano);
  });

  for (const [key, value] of Object.entries(objPedidosPorAno)) {
    for (const [k, v] of Object.entries(value)) {
      if (arrayPedidosPorAno.length <= 6) arrayPedidosPorAno.push(v);
    }
  }
}

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

function criarGraficos() {
  const lineCanvas = document.getElementById("lineChart");
  const doughnutCanvas = document.getElementById("doughnutChart");
  const barCanvas = document.getElementById("barChart");
  const valorMes = [];
  const infoMesAno = [];

  arrayPedidosPorAno.forEach((pedido) => {
    let mesAno = `${pedido.mes}/${pedido.ano}`;
    infoMesAno.push(mesAno);
    valorMes.push(pedido.total);
  });

  new Chart(lineCanvas, {
    type: "line",
    data: {
      labels: infoMesAno,
      datasets: [
        {
          label: "Custo mensal",
          data: valorMes,
          borderWidth: 1,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(doughnutCanvas, {
    type: "doughnut",
    data: {
      labels: infoMesAno,
      datasets: [
        {
          label: "Custo mensal",
          data: valorMes,
          backgroundColor: [
            "#165BAA",
            "#A155B9",
            "#F765A3",
            "#16BFD6",
            "#1DDD8D",
            "#953BBF",
          ],
          borderWidth: 1,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        htmlLegend: {
          containerID: "legenda-d-chart",
        },
        legend: {
          display: true,
          position: "right",
          align: "center",
        },
      },
    },
    // plugins: [htmlLegendPlugin],
  });

  new Chart(barCanvas, {
    type: "polarArea",
    data: {
      labels: infoMesAno,
      datasets: [
        {
          label: "Custo mensal",
          data: valorMes,
          borderWidth: 1,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

salvarBtn.addEventListener("click", (e) => {
  editarDadosDoUsuario();
});

editarDadosBtn.addEventListener("click", (e) => {
  const openTab = document.getElementById("minha-conta__dados");
  const closedTab1 = document.getElementById("minha-conta__estatisticas");
  const closedTab2 = document.getElementById("minha-conta__notificacoes");

  listarConteudo(
    e,
    openTab,
    closedTab1,
    closedTab2,
    editarDadosBtn,
    notificacoesBtn,
    estatisticasBtn
  );
});

estatisticasBtn.addEventListener("click", (e) => {
  const openTab = document.getElementById("minha-conta__estatisticas");
  const closedTab1 = document.getElementById("minha-conta__dados");
  const closedTab2 = document.getElementById("minha-conta__notificacoes");

  listarConteudo(
    e,
    openTab,
    closedTab1,
    closedTab2,
    estatisticasBtn,
    notificacoesBtn,
    editarDadosBtn
  );
});

notificacoesBtn.addEventListener("click", (e) => {
  const openTab = document.getElementById("minha-conta__notificacoes");
  const closedTab1 = document.getElementById("minha-conta__dados");
  const closedTab2 = document.getElementById("minha-conta__estatisticas");

  listarConteudo(
    e,
    openTab,
    closedTab1,
    closedTab2,
    notificacoesBtn,
    estatisticasBtn,
    editarDadosBtn
  );
});

meusFornecedores.addEventListener("click", (e) => {
  window.location.replace("./meusFornecedores.html");
});

const exportTableBtn = document.getElementById("exportar-table");
exportTableBtn.addEventListener("click", (e) => {
  const planilha = XLSX.utils.table_to_book(
    document.getElementById("tabela-relatorio")
  );
  XLSX.writeFile(planilha, "relatorio-anual.xlsx");
});

verificaTipoDeUsuario();
exibirDadosDoUsuario();
listarPedidosEmAberto();
filtrarPedidosPorAno();
const currentYear = new Date().getFullYear();
listarTabelaPedidosPorMes(currentYear);
criarGraficos();
