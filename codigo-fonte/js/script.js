import Api from "./api.js";

const isUserLogged = JSON.parse(localStorage.getItem("User"));

if (isUserLogged !== null) {
  const userNavbar = document.getElementById("user-navbar");

  const minhaConta = document.createElement("a");
  const minhaContaHamburger = document.getElementById("minha-conta-hamburger");
  const minhaContaSpan = document.createElement("span");

  minhaContaSpan.innerText = "Minha conta";
  minhaConta.href = "./minhaconta.html";
  minhaContaHamburger.style = "display: block";

  minhaConta.append(minhaContaSpan);
  userNavbar.append(minhaConta);
}

await Api.listarFornecedores();
