import Api from "./api.js";
import { salvarFornecedoresNoStorage } from "./listarFornecedores.js";
import { listarPedidosPorCliente } from "./listarpedidos.js";

const userData = JSON.parse(localStorage.getItem("User"));
listarPedidosPorCliente(userData.id);

salvarFornecedoresNoStorage();
