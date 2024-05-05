import Api from "./api.js";

const objLogin = {
  email: "contato@panco.com",
  password: "123456",
};

async function logUser() {
  const dados = await Api.login(objLogin);
  console.log(dados);

  const userData = JSON.parse(localStorage.getItem("User"));
  console.log(userData);
}

logUser();
