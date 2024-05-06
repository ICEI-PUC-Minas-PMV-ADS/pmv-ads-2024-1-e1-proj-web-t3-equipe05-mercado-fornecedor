//BUSCA ENDEREÇO PELO CEP E PREENCHE AUTOMATICAMENTE OS INPUTS
const btnCepCadastro = document.getElementById("buscar-btn-cep-cadastro");
const arrayEndereco = [];

const exibirEndereco = (endereco) => {
  for (const campo in endereco) {
    if (document.getElementById(campo)) {
      let input = document.getElementById(campo);
      input.value = endereco[campo];
      arrayEndereco.push(endereco[campo]);
    }
  }
};

btnCepCadastro.addEventListener("click", (e) => {
  const cepCadastro = document.getElementById("cep-cadastro");
  let cep = cepCadastro.value.replace("-", "");

  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
    .then((response) => {
      response.json().then((data) => exibirEndereco(data));
    })
    .catch((e) => console.log(e.message));
});
