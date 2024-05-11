import Api from "./api.js";
import { salvarFornecedoresNoStorage } from "./listarFornecedores.js";
import { listarPedidosPorCliente } from "./listarpedidos.js";
import { logUser } from "./login.js";
import { listarFornecedoresDoCliente } from "./meusFornecedores.js";

logUser();

const userData = JSON.parse(localStorage.getItem("User"));
listarPedidosPorCliente(userData.id);

salvarFornecedoresNoStorage();

listarFornecedoresDoCliente();
