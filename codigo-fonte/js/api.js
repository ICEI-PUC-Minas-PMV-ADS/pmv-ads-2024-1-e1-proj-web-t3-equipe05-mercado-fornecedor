class Api {
  static async cadastrarUsuario(dadosUsuario) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((error) => error);

    return response;
  }

  static async login(dadosDeLogin) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosDeLogin),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("User", JSON.stringify(res.user));
        localStorage.setItem("Token", res.accessToken);
        return res;
      })
      .catch((error) => error);

    console.log(response);
    return response;
  }

  static async listarUsuarios() {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });

    return response;
  }

  static async listarUsuariosPorId(id) {
    const response = await fetch(
      `https://mercado-do-fornecedor-api.onrender.com/users?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });

    return response;
  }

  static async listarTodosPedidos() {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/pedidos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status != 200) {
          return res.status;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (typeof res == "number") {
          return 400;
        } else {
          console.log(res);
        }
      });

    return response;
  }

  static async filtrarPedidosPorUser(userId) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/pedidos?userId=" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res);
    return response;
  }

  static async cadastrarPedido(pedido) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/pedidos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(pedido),
      }
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return response;
  }
}

export default Api;
