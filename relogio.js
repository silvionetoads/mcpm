// Exibe uma mensagem "Olá Mundo" no console do navegador
console.log("Olá Mundo");

// Insere a mensagem "Olá Mundo" no elemento com id "mensagem"
function exibirMensagem() {
    const elemento = document.getElementById('mensagem');
    if (elemento) {
        elemento.textContent = "Olá Mundo";
    } else {
        console.error("Elemento com id 'mensagem' não encontrado no HTML.");
    }
}

// Executa a função ao carregar o script
exibirMensagem();
