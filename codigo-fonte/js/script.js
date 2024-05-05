import Api from "./api.js";
import { listarPedidosPorCliente } from "./listarpedidos.js";

const userData = JSON.parse(localStorage.getItem("User"));
listarPedidosPorCliente(userData.id);

// async function buscaCEP(cep) {
//   const endereco = await Api.consultaCEP(cep);
//   console.log(endereco);
// }

// static async consultaCEP(cep) {
//     const response = await fetch("https://viacep.com.br/ws/" + cep + "/json", {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         return res;
//       });

//     return response;
//   }
