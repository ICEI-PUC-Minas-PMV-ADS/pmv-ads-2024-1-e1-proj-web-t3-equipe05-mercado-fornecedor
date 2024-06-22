import Api from "./api.js";

async function userLogin(userData) {
  const apiResponse = await Api.login(userData);

  if (apiResponse === "Incorrect password") {
    Toastify({
      close: true,
      // duration: 120000,
      text: "Senha ou usário inválidos.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ED213A, #93291E)",
      },
    }).showToast();
  } else if (apiResponse === "Cannot find user") {
    Toastify({
      close: true,
      // duration: 120000,
      text: "Senha ou usário inválidos.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ED213A, #93291E)",
      },
    }).showToast();
  } else if (apiResponse.accessToken !== undefined) {
    await Api.listarUsuarios();
    await Api.listarCotacoes();
    await Api.listarTodosPedidos();

    Toastify({
      close: true,
      // duration: 120000,
      text: "Login realizado com sucesso!",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00F260, #0575E6)",
      },
    }).showToast();

    //setTimeout(() => {
     // window.location = "./minhaconta.html";
    //}, 2000);
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("login-input-email").value;
    let senha = document.getElementById("login-input-senha").value;

    let formularioCompleto = {
      email: email,
      password: senha,
    };
    console.log(formularioCompleto);
    userLogin(formularioCompleto);
  });

//     // Chamada à API de autenticação
//     fetch('./api.js', {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formularioCompleto)
//     })
//     .then(response => response.json())
//     .then(data => {
//     if (data.success) {
// //             // Autenticação bem sucedida
//     console.log('Login bem sucedido!');
// //             // Redireciona para a página principal ou dashboard
//     window.location.href = './index.html';
//     }
// else {
//             // Autenticação falhou
//             console.log('Falha no login: ', data.message);
//             // Exibir mensagem de erro ao usuário
//             document.getElementById('error message').innerText = data.message;
//         }
//     })
//     .catch(error => {
//         console.error('Erro:', error);
//         document.getElementById('error-message').innerText = 'Ocorreu um erro. Tente novamente mais tarde.';
//     });
// });
