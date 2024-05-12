import Api from "./api.js";
import { salvarFornecedoresNoStorage } from "./listarFornecedores.js";
import { logUser } from "./login.js";
logUser();

salvarFornecedoresNoStorage();
