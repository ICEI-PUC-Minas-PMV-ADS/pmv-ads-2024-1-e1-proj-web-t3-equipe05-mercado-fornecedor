import Api from "./api.js";
// import { geraPedidos } from "./listarpedidos.js";

const objLogin = {
  email: "contato@acrilex.com",
  password: "123456",
};

export async function logUser() {
  const dados = await Api.login(objLogin);
  localStorage.setItem("UserLogin", JSON.stringify(objLogin));

  const userData = JSON.parse(localStorage.getItem("User"));

  const userNavbar = document.getElementById("user-navbar");

  const minhaConta = document.createElement("a");
  const minhaContaSpan = document.createElement("span");

  minhaContaSpan.innerText = "Minha conta";
  minhaConta.href = "./minhaconta.html";

  minhaConta.append(minhaContaSpan);
  userNavbar.append(minhaConta);
  console.log(dados);

  // geraPedidos();
}

logUser();
