import Api from "./api.js";

const objLogin = {
  email: "contato@acrilex.com",
  password: "123456",
};

async function logUser() {
  const dados = await Api.login(objLogin);

  const userData = JSON.parse(localStorage.getItem("User"));
}

logUser();