// FUNÇÕES PARA ABRIR E FECHAR O MENU DE USUÁRIO

function openNav() {
  document.getElementById("hiddenNav").style.height = "100px";
  document.getElementById("header").style.marginTop = "100px";
}

function closeNav() {
  document.getElementById("hiddenNav").style.height = "0";
  document.getElementById("header").style.marginTop = "0";
}
