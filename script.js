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
    let clickCount = 0;
const clickCountDisplay = document.getElementById('click-count');

cell.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
    if (parseInt(cell.dataset.index) === treasurePosition) {
        cell.classList.add('treasure');
        alert('Você encontrou o tesouro!');
    } else {
        cell.classList.add('clicked');
        alert('Nada aqui, continue procurando!');
    }
});

});

document.getElementById('reset-button').addEventListener('click', () => {
    clickCount = 0;
    clickCountDisplay.textContent = clickCount;
    gameBoard.innerHTML = '';
    // Regenerate the game board
    initializeGame();
});

function initializeGame() {
    const treasurePosition = Math.floor(Math.random() * totalCells);
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => {
            clickCount++;
            clickCountDisplay.textContent = clickCount;
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
}

initializeGame();
const messageDisplay = document.getElementById('message');

cell.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
    if (parseInt(cell.dataset.index) === treasurePosition) {
        cell.classList.add('treasure');
        messageDisplay.textContent = 'Você encontrou o tesouro!';
    } else {
        cell.classList.add('clicked');
        messageDisplay.textContent = 'Nada aqui, continue procurando!';
    }
});

