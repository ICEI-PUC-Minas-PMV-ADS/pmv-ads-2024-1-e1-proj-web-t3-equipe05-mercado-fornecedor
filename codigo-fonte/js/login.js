import Api from "./api.js";

const objLogin = {
  email: "contato@usiminas.com",
  password: "123456",
};

export async function logUser() {
  const dados = await Api.login(objLogin);

  const userData = JSON.parse(localStorage.getItem("User"));

  const userNavbar = document.getElementById("user-navbar");

  const minhaConta = document.createElement("a");
  const minhaContaSpan = document.createElement("span");

  minhaContaSpan.innerText = "Minha conta";
  minhaConta.href = "./minhaconta.html";

  minhaConta.append(minhaContaSpan);
  userNavbar.append(minhaConta);
}

logUser();
