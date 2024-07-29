document.addEventListener('DOMContentLoaded', () => {
    const startBetButton = document.getElementById('startBet');

    startBetButton.addEventListener('click', () => {
        alert('Você será redirecionado para a página de apostas para o jogo Flamengo vs Palmeiras!');
        // Redirecionar para a página de apostas
        // window.location.href = 'pagina-de-apostas.html'; // Exemplo de redirecionamento
    });
});

