class Api {
  static async consultaCEP(cep) {
    const response = await fetch("https://viacep.com.br/ws/" + cep + "/json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      });

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
      .then((res) => {
        if (res.status != 200) {
          return res.status;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (typeof res == "number") {
          console.log("Erro!");
          return res;
        } else {
          localStorage.setItem("User", JSON.stringify(res.user));
          localStorage.setItem("Token", res.accessToken);
          return res;
        }
      });

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
}

export default Api;
