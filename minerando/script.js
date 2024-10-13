// Inicializando variáveis globais
let miner;

// Função para iniciar a mineração
document.getElementById('startMining').addEventListener('click', function() {
    const walletAddress = document.getElementById('walletAddress').value.trim(); // Obter o endereço da carteira
    const threads = parseInt(document.getElementById('miningPower').value); // Obter o poder de mineração

    if (walletAddress === '') {
        alert('Por favor, insira um endereço de carteira válido.'); // Verificação de endereço vazio
        return;
    }

    // Criando um novo minerador com o WebMinePool
    miner = new Miner(walletAddress, 'webminepool.com:3333', {
        autoThreads: true,
        siteKey: 'SK_w6ADNar9266eiRy32r3Yt', // Seu sitekey do WebMinePool
        threads: threads // Altera o número de threads conforme o valor do controle deslizante
    });

    miner.start(); // Iniciar a mineração
    document.getElementById('startMining').disabled = true; // Desabilita o botão de iniciar
    document.getElementById('stopMining').disabled = false; // Habilita o botão de parar
});

// Função para parar a mineração
document.getElementById('stopMining').addEventListener('click', function() {
    miner.stop();
    document.getElementById('startMining').disabled = false; // Habilita o botão de iniciar
    document.getElementById('stopMining').disabled = true; // Desabilita o botão de parar
});

// Atualizando o status da mineração a cada segundo
setInterval(() => {
    if (miner) {
        document.getElementById('hashRate').innerText = miner.getHashRate().toFixed(2) + ' H/s'; // Mostra a taxa de hash
        document.getElementById('moneroMined').innerText = miner.getTotalMined().toFixed(8) + ' XMR'; // Mostra o Monero minerado
        document.getElementById('cpuUsage').innerText = miner.getCPUUsage().toFixed(2) + ' %'; // Mostra a utilização da CPU
    }
}, 1000);
