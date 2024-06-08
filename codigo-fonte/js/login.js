import Api from "./api.js";

const objLogin = {
  email: "contato@inova.com",
  password: "123456",
};

export async function logUser() {
  const isUserLogged = JSON.parse(localStorage.getItem("User"));
  if (isUserLogged === null) {
    const dados = await Api.login(objLogin);
  }
  const users = await Api.listarUsuarios();
  localStorage.setItem("Users", JSON.stringify(users));
}

logUser();
