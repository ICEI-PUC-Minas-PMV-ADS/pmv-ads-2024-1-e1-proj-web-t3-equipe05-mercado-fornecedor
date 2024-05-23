import Api from "./api.js";
import db_json from "../json/db.json"  with { type: "json" };

//BUSCA ENDEREÇO PELO CEP E PREENCHE AUTOMATICAMENTE OS INPUTS
// const btnCepCadastro = document.getElementById("buscar-btn-cep-cadastro");
// const objEndereco = {};

// const exibirEndereco = (endereco) => {
//   for (const campo in endereco) {
//     if (document.getElementById(campo)) {
//       let input = document.getElementById(campo);
//       input.value = endereco[campo];
//       objEndereco[campo] = endereco[campo];
//     }
//   }
// };

// btnCepCadastro.addEventListener("click", (e) => {
//   const cepCadastro = document.getElementById("cep-cadastro");
//   let cep = cepCadastro.value.replace("-", "");

//   const options = {
//     method: "GET",
//     mode: "cors",
//     cache: "default",
//   };

//   fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
//     .then((response) => {
//       response.json().then((data) => exibirEndereco(data));
//     })
//     .catch((e) => console.log(e.message));
// });

function cadastrarUsuario() {
  const nome = document.getElementById("cadastro-nome").value;
  const cnpj = document.getElementById("cadastro-cnpj").value;
  // const complementoEnd = document.getElementById("cadastro-complemento").value;
  // const numeroEnd = document.getElementById("cadastro-numero").value;
  // const telefone = document.getElementById("cadastro-telefone").value;
  // const marcaImg = document.getElementById("cadastro-imgUrl").value;
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;

  let radioBtnGroup = document.querySelectorAll('input[name="tipo"]');
  let radioChecked;
  for (const radio of radioBtnGroup) {
    if (radio.checked) radioChecked = radio.value;
  }

  // objEndereco.complemento = complementoEnd;
  // objEndereco.numero = numeroEnd;

  const defaultImg = "https://i.postimg.cc/jjmBPG1M/default-User.png";

  const objUser = {
    nome: nome,
    cnpj: cnpj,
    tipo: radioChecked,
    segmento: "Outro",
    endereco: null,
    telefone: null,
    imgUrl: defaultImg,
    email: email,
    password: senha,
    pedidos: [],
  };

  let storageDB = JSON.parse(localStorage.getItem("Users"));
  const filtraFornecedor = db_json.users.filter((user) => user.email == email);

  if (storageDB === null) {
    localStorage.setItem("Users", JSON.stringify(db_json.users));
    storageDB = JSON.parse(localStorage.getItem("Users"));
  }

  console.log(filtraFornecedor)

  Api.cadastrarUsuario(objUser);

  if (filtraFornecedor.length === 0) {
    let id;

    let p = storageDB.length;

    if (email !== "" && senha !== "") {
      db_json.users = storageDB;
      id = db_json.users[p - 1].id + 1;
      objUser.id = id;

      db_json.users.push(objUser);
      localStorage.setItem("Users", JSON.stringify(db_json.users));
    }
  }
}
const btnCadastrarUser = document.getElementById("cadastrar-user-btn");

btnCadastrarUser.addEventListener("click", (e) => {
  e.preventDefault();
  cadastrarUsuario();
  // document.getElementById("form-cadastro-usuario").reset();
});
