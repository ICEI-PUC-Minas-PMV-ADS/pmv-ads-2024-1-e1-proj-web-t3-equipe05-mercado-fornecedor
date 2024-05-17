import Api from "./api.js";
import db_json from "../json/db.json" with { type: "json" };

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

  const defaultImg = "https://i.ibb.co/ydQxnbG/default-User.png";

  const objUser = {
    nome: nome,
    cnpj: cnpj,
    tipo: radioChecked,
    segmento: "outro",
    endereco: null,
    telefone: null,
    imgUrl: defaultImg,
    email: email,
    password: senha,
  };

  const storageDB = JSON.parse(localStorage.getItem("users"));
  const filtraFornecedor = db_json.users.filter((user) => user.email == email)

  if(!filtraFornecedor[0]) {
    if(email !== '' && senha !== '') {
      if(storageDB === null) {

        db_json.users.push(objUser);
        localStorage.setItem("users", JSON.stringify(db_json.users));
      }
      else {
        db_json.users = storageDB;
        db_json.users.push(objUser);
        localStorage.setItem("users", JSON.stringify(db_json.users));
      }
    }
  }
  
  console.log(db_json.users)
  Api.cadastrarUsuario(objUser);
}

const btnCadastrarUser = document.getElementById("cadastrar-user-btn");

btnCadastrarUser.addEventListener("click", (e) => {
  e.preventDefault();
  cadastrarUsuario();
  // document.getElementById("form-cadastro-usuario").reset();
});
