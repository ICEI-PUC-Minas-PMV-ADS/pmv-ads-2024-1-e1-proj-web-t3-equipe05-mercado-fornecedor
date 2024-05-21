import Api from "./api.js";

const listaDePedidos = JSON.parse(localStorage.getItem("listaDePedidos"));
const user = JSON.parse(localStorage.getItem("User"));
const verPedidos = document.getElementById("visualizar-pedidos");
const meusFornecedores = document.getElementById("meus-fornecedores");
const salvarBtn = document.getElementById("minha-conta__salvar-btn");
const editarDadosBtn = document.getElementById("editar-dados");
const estatisticasBtn = document.getElementById("estatisticas");

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

  // window.location.reload();
}

function listarPedidosEmAberto() {
  const pedidosEmAberto = listaDePedidos.filter(
    (pedido) => pedido.userId === user.id && pedido.status === "em aberto"
  );

  pedidosEmAberto.forEach((pedido) => {
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
}

function listarConteudo(e, openTab, closedTab, activeBtn, disabledBtn) {
  closedTab.style.display = "none";
  openTab.style.display = "block";

  activeBtn.className = "minha-conta__menu-item minha-conta__menu-item--active";
  disabledBtn.className =
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
    const pedidosDoMes = listaDePedidos.filter((pedido) => {
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

function listarTabelaPedidosPorMes(anoAtual) {
  const pedidosPorMes = filtrarPedidosAnuais(anoAtual);
  const meses = Object.values(pedidosPorMes).reverse();

  meses.forEach((mes) => {
    const ano = new Date().getFullYear();

    const table = document.getElementById("minha-conta__table-custo");

    const row = document.createElement("tr");
    const colunaMes = document.createElement("td");
    const colunaFinalizados = document.createElement("td");
    const colunaAbertos = document.createElement("td");
    const colunaTotal = document.createElement("td");

    const valorTotal = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(mes.total);

    colunaMes.innerText = `${mes.mes}/${anoAtual}`;
    colunaFinalizados.innerText = `${mes.pedidosFinalizados} pedidos`;
    colunaAbertos.innerText = `${mes.pedidosEmAberto} pedidos`;
    colunaTotal.innerText = valorTotal;

    row.append(colunaMes, colunaFinalizados, colunaAbertos, colunaTotal);
    table.append(row);
  });
}

salvarBtn.addEventListener("click", (e) => {
  editarDadosDoUsuario();
});

editarDadosBtn.addEventListener("click", (e) => {
  const openTab = document.getElementById("minha-conta__dados");
  const closedTab = document.getElementById("minha-conta__estatisticas");

  listarConteudo(e, openTab, closedTab, editarDadosBtn, estatisticasBtn);
});

estatisticasBtn.addEventListener("click", (e) => {
  const openTab = document.getElementById("minha-conta__estatisticas");
  const closedTab = document.getElementById("minha-conta__dados");

  listarConteudo(e, openTab, closedTab, estatisticasBtn, editarDadosBtn);
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

verPedidos.addEventListener("click", (e) => {
  window.location.replace("./painelDeControleCliente.html");
});

exibirDadosDoUsuario();
listarPedidosEmAberto();
listarTabelaPedidosPorMes(2024);
