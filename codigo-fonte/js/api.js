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

    let toastMessage;
    let toastBgColor;

    if (response == "Email already exists") {
      toastMessage = "E-mail já cadastrado";
      toastBgColor = "linear-gradient(to right, #ED213A, #93291E)";
    } else if (response == "Email and password are required") {
      toastMessage = "Digite e-mail e senha";
      toastBgColor = "linear-gradient(to right, #ED213A, #93291E)";
    } else {
      toastMessage = "Usuário cadastrado com sucesso!";
      toastBgColor = "linear-gradient(to right, #00F260, #0575E6)";
      setTimeout(() => {
        window.location = "./login.html";
      }, 4000);
    }

    Toastify({
      close: true,
      // duration: 120000,
      text: toastMessage,
      className: "info",
      style: {
        background: toastBgColor,
      },
    }).showToast();

    return response;
  }

  static async editarUsuario(dadosUsuario, id) {
    const response = await fetch(
      `https://mercado-do-fornecedor-api.onrender.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(dadosUsuario),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        localStorage.setItem("User", JSON.stringify(res));
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
        localStorage.setItem("Users", JSON.stringify(res));
        return res;
      });

    return response;
  }

  static async listarFornecedores() {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/users?tipo=fornecedor",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("Fornecedores", JSON.stringify(res));
        return res;
      });

    return response;
  }

  static async listarClientes() {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/users?tipo=cliente",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("Clientes", JSON.stringify(res));
        return res;
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
      .then((res) => res);

    return response;
  }

  static async apagarUsuario(userId) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/users/" + userId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
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
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        localStorage.setItem("listaDePedidos", JSON.stringify(res));
        return res;
      });

    return response;
  }

  // static async listarPedidosPaginados(page) {
  //   const response = await fetch(
  //     `https://mercado-do-fornecedor-api.onrender.com/pedidos?_sort=id&_order=desc&_page=${page}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (res.status != 200) {
  //         return res.status;
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((res) => {
  //       if (typeof res == "number") {
  //         return 400;
  //       } else {
  //         return res;
  //       }
  //     });

  //   return response;
  // }

  static async filtrarPedidosPorUser(userId) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/pedidos?_sort=id&_order=desc&userId=" +
        userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        localStorage.setItem("listaDePedidos", JSON.stringify(res));
        return res;
      });
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
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
      })
      .catch((error) => error);

    return response;
  }

  static async editarPedido(dadosPedido, id) {
    const response = await fetch(
      `https://mercado-do-fornecedor-api.onrender.com/pedidos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(dadosPedido),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
      })
      .catch((error) => error);

    return response;
  }

  // static async listarCotacoesPorPedido(pedidoId) {
  //   const response = await fetch(
  //     "https://mercado-do-fornecedor-api.onrender.com/pedidos?_sort=id&_order=desc&pedidoId=" +
  //       pedidoId,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => res);
  //   return response;
  // }

  static async cadastrarCotacao(cotacao) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/cotacoes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(cotacao),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
      });
    return response;
  }

  static async listarCotacoes() {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/cotacoes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        localStorage.setItem("Cotacoes", JSON.stringify(res));
        return res;
      });
    return response;
  }

  static async editarCotacao(dadosCotacao, id) {
    const response = await fetch(
      `https://mercado-do-fornecedor-api.onrender.com/cotacoes/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(dadosCotacao),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
      })
      .catch((error) => error);

    return response;
  }

  static async removerCotacao(cotId) {
    const response = await fetch(
      `https://mercado-do-fornecedor-api.onrender.com/cotacoes/${cotId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
      });
    return response;
  }

  static async cadastrarItens(itensDoPedido) {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/itensDePedidos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(itensDoPedido),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        return res;
      });
    return response;
  }

  static async listarItens() {
    const response = await fetch(
      "https://mercado-do-fornecedor-api.onrender.com/itensDePedidos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "jwt expired") {
          Toastify({
            close: true,
            // duration: 120000,
            text: "Token expirado. Faça login novamente.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ED213A, #93291E)",
            },
          }).showToast();

          setTimeout(() => {
            window.location = "./login.html";
          }, 1000);
        }
        localStorage.setItem("itensDePedidos", JSON.stringify(res));
        return res;
      });
    return response;
  }
}

export default Api;
