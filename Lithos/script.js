const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const playerNameInput = document.getElementById('playerName');
const confirmButton = document.querySelector('.confirm-button');
const clearButton = document.querySelector('.clear-button');
const dialog = document.getElementById('dialog');
const dialogMessage = document.getElementById('dialogMessage');
const dialogButton = document.getElementById('dialogButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const welcomeMessage = document.getElementById('welcomeMessage');
const timerElement = document.getElementById('time');

const playerSize = 30;
const characterSize = 30;
const characters = [];
let player = { x: 300, y: 300, color: 'blue', image: null };
let master = { x: 0, y: 0, found: false };

const names = ['Enoque', 'Adão', 'Caim', 'Mestre'];
const messages = [
    'Parabéns! Você encontrou o Mestre!',
    'Ótimo trabalho! Pronto para o próximo estágio?',
    'Você fez um ótimo trabalho! Continue assim!'
];

const images = {
    'Enoque': new Image(),
    'Adão': new Image(),
    'Caim': new Image(),
    'Mestre': new Image()
};

images['Enoque'].src = 'path/to/enoch.png';
images['Adão'].src = 'path/to/adam.png';
images['Caim'].src = 'path/to/cain.png';
images['Mestre'].src = 'path/to/master.png';

function selectCharacter(gender) {
    player.color = gender === 'male' ? 'blue' : 'pink';
    player.image = gender === 'male' ? 'path/to/male_character.png' : 'path/to/female_character.png';
    document.querySelectorAll('.character').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

function clearData() {
    playerNameInput.value = '';
    document.querySelectorAll('.character').forEach(el => el.classList.remove('selected'));
    player.color = '';
    player.image = null;
}

function confirmData() {
    const name = playerNameInput.value;
    if (!name || !player.color || !player.image) {
        alert('Por favor, preencha todos os campos e selecione um personagem.');
        return;
    }
    localStorage.setItem('playerName', name);
    localStorage.setItem('playerColor', player.color);
    localStorage.setItem('playerImage', player.image);
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initGame();
}

function initGame() {
    characters.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.x = 300;
    player.y = 300;

    const playerImg = new Image();
    playerImg.src = localStorage.getItem('playerImage');
    playerImg.onload = () => ctx.drawImage(playerImg, player.x, player.y, playerSize, playerSize);

    master.x = getRandomPosition();
    master.y = getRandomPosition();

    for (let i = 0; i < 3; i++) {
        let character;
        do {
            character = {
                x: getRandomPosition(),
                y: getRandomPosition(),
                name: names[i]
            };
        } while (characters.some(c => Math.abs(c.x - character.x) < characterSize && Math.abs(c.y - character.y) < characterSize));
        characters.push(character);
    }
    characters.push({ x: master.x, y: master.y, name: 'Mestre' });

    characters.forEach(c => {
        ctx.drawImage(images[c.name], c.x, c.y, characterSize, characterSize);
    });

    ctx.drawImage(playerImg, player.x, player.y, playerSize, playerSize);

    document.addEventListener('keydown', movePlayer);

    startTimer(300); // 5 minutos = 300 segundos
}

function getRandomPosition() {
    return Math.floor(Math.random() * (canvas.width - characterSize));
}

function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            player.y = Math.max(0, player.y - 5);
            break;
        case 'ArrowDown':
            player.y = Math.min(canvas.height - playerSize, player.y + 5);
            break;
        case 'ArrowLeft':
            player.x = Math.max(0, player.x - 5);
            break;
        case 'ArrowRight':
            player.x = Math.min(canvas.width - playerSize, player.x + 5);
            break;
    }
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    characters.forEach(c => {
        ctx.drawImage(images[c.name], c.x, c.y, characterSize, characterSize);
    });

    const playerImg = new Image();
    playerImg.src = localStorage.getItem('playerImage');
    playerImg.onload = () => ctx.drawImage(playerImg, player.x, player.y, playerSize, playerSize);

    checkCollision();
}

function checkCollision() {
    for (const c of characters) {
        if (c.name === 'Mestre') continue;
        if (player.x < c.x + characterSize &&
            player.x + playerSize > c.x &&
            player.y < c.y + characterSize &&
            player.y + playerSize > c.y) {
            showDialog(`Você encontrou ${c.name}. Errou! Continue procurando.`, 'OK');
            return;
        }
    }
    if (player.x < master.x + characterSize &&
        player.x + playerSize > master.x &&
        player.y < master.y + characterSize &&
        player.y + playerSize > master.y) {
        showDialog(getRandomMessage(), 'Sim', 'Não');
    }
}

function showDialog(message, yesText, noText) {
    dialogMessage.textContent = message;
    dialogButton.textContent = yesText || 'OK';
    dialogButton.onclick = () => {
        if (yesText) {
            dialog.classList.add('hidden');
            // Proceed to next stage or restart
        } else {
            dialog.classList.add('hidden');
            startScreen.classList.remove('hidden');
            gameScreen.classList.add('hidden');
        }
    };
    dialog.classList.remove('hidden');
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

let timerInterval;

function startTimer(seconds) {
    let remainingTime = seconds;
    timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const secs = remainingTime % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            alert('Tempo esgotado! O jogo acabou.');
            // Optionally, handle what happens when time is up
        }
    }, 1000);
}
