document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const gameArea = document.getElementById('gameArea');
    let stones = document.querySelectorAll('.stone');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const levelText = document.getElementById('levelText');
    const messageContainer = document.getElementById('messageContainer');
    const continueButton = document.getElementById('continueButton');
    const step = 5; // Quantidade de pixels que o jogador se move a cada vez
    let totalStones = 1; // Quantidade inicial de pedras
    let progress = 10; // Pontos iniciais
    let level = 1; // Nível inicial
    let posX = 325; // Posição inicial horizontal do jogador
    let posY = 325; // Posição inicial vertical do jogador

    // Adiciona o som de colisão
    const collisionSound = new Audio('path/to/collision.mp3');

    function movePlayer(dx, dy) {
        const newX = posX + dx;
        const newY = posY + dy;

        // Verifica limites da área do jogo
        if (newX >= 0 && newX <= gameArea.clientWidth - player.clientWidth) {
            posX = newX;
        }

        if (newY >= 0 && newY <= gameArea.clientHeight - player.clientHeight) {
            posY = newY;
        }

        player.style.left = `${posX}px`;
        player.style.top = `${posY}px`;

        checkCollisions();
    }

    function positionStones() {
        stones.forEach(stone => {
            const x = Math.floor(Math.random() * (gameArea.clientWidth - stone.clientWidth));
            const y = Math.floor(Math.random() * (gameArea.clientHeight - stone.clientHeight));
            stone.style.left = `${x}px`;
            stone.style.top = `${y}px`;
            stone.style.display = 'block'; // Garante que as pedras estão visíveis
        });
    }

    function checkCollisions() {
        stones.forEach(stone => {
            const sRect = stone.getBoundingClientRect();
            const pRect = player.getBoundingClientRect();

            if (
                pRect.left < sRect.left + sRect.width &&
                pRect.left + pRect.width > sRect.left &&
                pRect.top < sRect.top + sRect.height &&
                pRect.top + pRect.height > sRect.top
            ) {
                // Colisão detectada
                handleCollision(stone);
            }
        });
    }

    function handleCollision(stone) {
        // Reproduz o som de colisão
        collisionSound.play();

        // Remove a pedra após a colisão
        stone.style.display = 'none';
        progress -= 1;

        if (progress < 0) {
            progress = 0;
        }

        updateProgressBar();

        // Verifica se há mais pedras para adicionar
        if (progress > 0 && document.querySelectorAll('.stone[style*="display: block"]').length === 0) {
            addMoreStones();
        }

        // Verifica se a barra de progresso foi preenchida
        if (progress === 0) {
            if (messageContainer.classList.contains('d-none')) {
                showSuccessMessage();
            }
        }
    }

    function updateProgressBar() {
        const percentage = (progress / 10) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${progress}/10`;
    }

    function showSuccessMessage() {
        messageContainer.classList.remove('d-none');
    }

    function addMoreStones() {
        let currentStones = document.querySelectorAll('.stone[style*="display: block"]').length;
        let stonesToAdd = totalStones - currentStones;

        if (stonesToAdd > 0) {
            for (let i = 0; i < stonesToAdd; i++) {
                let stone = document.createElement('div');
                stone.className = 'stone';
                gameArea.appendChild(stone);
                positionStone(stone);
            }
            stones = document.querySelectorAll('.stone'); // Atualiza a lista de pedras
        }
    }

    function positionStone(stone) {
        const x = Math.floor(Math.random() * (gameArea.clientWidth - stone.clientWidth));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - stone.clientHeight));
        stone.style.left = `${x}px`;
        stone.style.top = `${y}px`;
        stone.style.display = 'block'; // Garante que a pedra está visível
    }

    function resetLevel() {
        progress = Math.ceil(10 * 0.7); // Reduz a barra de progresso em 30%
        updateProgressBar();
        totalStones = Math.min(1 + (level - 1) * 2, 7); // Aumenta as pedras de acordo com o nível, no máximo 7
        addMoreStones();
        level += 1; // Avança o nível
        levelText.textContent = `Nível: ${level}`;
    }

    continueButton.addEventListener('click', () => {
        messageContainer.classList.add('d-none');
        // Define o progresso inicial como 3 pontos
        progress = 3;
        updateProgressBar();
        resetLevel();
    });

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                movePlayer(0, -step);
                player.style.transform = 'scaleX(1)'; // Direita
                break;
            case 'ArrowDown':
                movePlayer(0, step);
                break;
            case 'ArrowLeft':
                movePlayer(-step, 0);
                player.style.transform = 'scaleX(-1)'; // Esquerda
                break;
            case 'ArrowRight':
                movePlayer(step, 0);
                player.style.transform = 'scaleX(1)'; // Direita
                break;
        }
    });

    // Adiciona eventos para botões de controle móveis
    document.getElementById('btnUp').addEventListener('click', () => movePlayer(0, -step));
    document.getElementById('btnDown').addEventListener('click', () => movePlayer(0, step));
    document.getElementById('btnLeft').addEventListener('click', () => movePlayer(-step, 0));
    document.getElementById('btnRight').addEventListener('click', () => movePlayer(step, 0));

    // Posiciona as pedras aleatoriamente ao carregar a página
    positionStones();
    // Atualiza a barra de progresso inicial
    updateProgressBar();
});
