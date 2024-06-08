document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("login-input-email").value
    let senha = document.getElementById("login-input-senha").value

    let formularioCompleto = [email, senha]
    console.log(formularioCompleto); 
} )

//     // Chamada à API de autenticação
    fetch('./api.js', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(formularioCompleto)
    })
    .then(response => response.json())
    .then(data => {
    if (data.success) {
//             // Autenticação bem sucedida
    console.log('Login bem sucedido!');
//             // Redireciona para a página principal ou dashboard
    window.location.href = './index.html';
    } 
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
