import Api from "./api.js";

const userData = JSON.parse(localStorage.getItem("User"));
const pedidosLista = await Api.filtrarPedidosPorUser(userData.id);
const pedidosPaginados = [];