import clientes from "../json/clientes.json" with {type: "json"};

console.log(typeof clientes.listaDeClientes);


clientes.listaDeClientes.forEach((objetoCliente) => {
    console.log(objetoCliente.nome);
    console.log(objetoCliente.cnpj)
})

// ADICIONA E REMOVE ITENS DO MODAL NA JANELA MODAL PARA CRIAR PEDIDOS
let counterItensPedido = 0;

const btnAddItem = document.getElementById("add-btn-item-pedido");
btnAddItem.addEventListener("click", function() {
    let itemPedido = document.getElementById("add-item-pedido").value;
    let qtdItemPedido = document.getElementById("add-qtd-item-pedido").value;

    const listaItensPedido = document.getElementById("lista-itens-pedido");
    
    const item = document.createElement("li");
    const nomeItem = document.createElement("div");
    const qtdItem = document.createElement("div");
    const closeBtnContainer = document.createElement("div");
    const closeBtn = document.createElement("i");

    // item.setAttribute("class", "itens-pedido-cadastrados");
    item.classList.add("itens-pedido-cadastrados", "faded-out")
    item.setAttribute("id", "id-" + counterItensPedido);
    nomeItem.setAttribute("class", "ipc-1");
    qtdItem.setAttribute("class", "ipc-1");
    closeBtnContainer.setAttribute("class", "item-close-icon");
    closeBtnContainer.setAttribute("id", counterItensPedido);
    closeBtn.classList.add("fa-solid", "fa-xmark")

    nomeItem.innerText = itemPedido;
    qtdItem.innerText = qtdItemPedido;

    item.appendChild(nomeItem);
    item.appendChild(qtdItem);
    closeBtnContainer.appendChild(closeBtn);
    item.appendChild(closeBtnContainer);

    listaItensPedido.appendChild(item);

    requestAnimationFrame(() => {
        item.classList.remove("faded-out");
    })

    const btnRemoveItem = document.getElementById(counterItensPedido);
    btnRemoveItem.addEventListener("click", function() {
        const itemLista = document.getElementById("id-" + btnRemoveItem.id);
        itemLista.remove();
    })

    counterItensPedido++;

});