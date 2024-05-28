document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const rows = 5;
    const cols = 5;
    const totalCells = rows * cols;
    
    // Gera uma posição aleatória para o tesouro
    const treasurePosition = Math.floor(Math.random() * totalCells);
    
    // Cria as células do jogo
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        
        // Adiciona um evento de clique para cada célula
        cell.addEventListener('click', () => {
            if (parseInt(cell.dataset.index) === treasurePosition) {
                cell.classList.add('treasure');
                alert('Você encontrou o tesouro!');
            } else {
                cell.classList.add('clicked');
                alert('Nada aqui, continue procurando!');
            }
        });
        
        gameBoard.appendChild(cell);
    }
});
