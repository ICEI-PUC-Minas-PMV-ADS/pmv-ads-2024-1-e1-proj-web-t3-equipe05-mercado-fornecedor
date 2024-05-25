import Api from "./api.js";
import db_json from "../json/db.json"  with { type: "json" };

function cadastrarUsuario() {
  const nome = document.getElementById("cadastro-nome").value;
  const cnpj = document.getElementById("cadastro-cnpj").value;
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;

  let radioBtnGroup = document.querySelectorAll('input[name="tipo"]');
  let radioChecked;
  for (const radio of radioBtnGroup) {
    if (radio.checked) radioChecked = radio.value;
  }

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
});
