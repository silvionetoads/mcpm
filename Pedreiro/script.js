document.addEventListener('DOMContentLoaded', function() {
    let currentFase = 1;
    const timerElement = document.getElementById('timer');
    const arena = document.getElementById('arena');
    let intervalId;

    const showFase = (fase) => {
        document.querySelectorAll('.fase').forEach(f => f.style.display = 'none');
        document.getElementById(`fase${fase}`).style.display = 'block';
    };

    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        intervalId = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = "Tempo restante: " + minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(intervalId);
                alert('Tempo esgotado! Você não encontrou o Mestre Pedreiro a tempo.');
                // Reiniciar ou terminar o jogo
            }
        }, 1000);
    };

    const checkCollision = (rect1, rect2) => {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    };

    const movePersonagem = (personagem, personagens) => {
        const maxX = arena.clientWidth - personagem.clientWidth;
        const maxY = arena.clientHeight - personagem.clientHeight;

        const move = () => {
            let collision;
            let newX, newY;
            do {
                newX = Math.floor(Math.random() * maxX);
                newY = Math.floor(Math.random() * maxY);
                personagem.style.left = `${newX}px`;
                personagem.style.top = `${newY}px`;
                collision = false;
                personagens.forEach(p => {
                    if (p !== personagem && checkCollision(p.getBoundingClientRect(), personagem.getBoundingClientRect())) {
                        collision = true;
                    }
                });
            } while (collision);
        };

        move();
        setInterval(move, 2000); // Mover o personagem a cada 2 segundos
    };

    const personagens = [
        { nome: 'João', id: 1 },
        { nome: 'Maria', id: 2 },
        { nome: 'Carlos', id: 3 },
        { nome: 'Ana', id: 4 },
        { nome: 'Mestre Pedreiro', id: 5 }
    ];

    const containerArena = document.getElementById('arena');
    const personagemElements = [];
    personagens.forEach((pessoa, index) => {
        const div = document.createElement('div');
        div.className = `personagem personagem-${index + 1}`;
        div.dataset.id = pessoa.id;
        containerArena.appendChild(div);
        personagemElements.push(div);
        movePersonagem(div, personagemElements);
    });

    const player = document.createElement('div');
    player.className = 'player';
    player.style.left = '0px';
    player.style.top = '0px';
    containerArena.appendChild(player);

    const movePlayer = (event) => {
        const step = 10;
        const currentLeft = parseInt(player.style.left);
        const currentTop = parseInt(player.style.top);

        switch(event.key) {
            case 'ArrowUp':
                player.style.top = `${Math.max(0, currentTop - step)}px`;
                break;
            case 'ArrowDown':
                player.style.top = `${Math.min(arena.clientHeight - player.clientHeight, currentTop + step)}px`;
                break;
            case 'ArrowLeft':
                player.style.left = `${Math.max(0, currentLeft - step)}px`;
                break;
            case 'ArrowRight':
                player.style.left = `${Math.min(arena.clientWidth - player.clientWidth, currentLeft + step)}px`;
                break;
        }

        personagemElements.forEach(personagem => {
            if (checkCollision(player.getBoundingClientRect(), personagem.getBoundingClientRect())) {
                if (personagem.dataset.id == 5) {
                    clearInterval(intervalId);
                    alert('Parabéns Curioso, agora você passou de fase.');
                    currentFase++;
                    showFase(currentFase);
                }
            }
        });
    };

    document.addEventListener('keydown', movePlayer);

    document.getElementById('prova1').addEventListener('click', function() {
        alert('Prova de Conhecimento completada! Você ganhou 10 pontos.');
        // Adicionar lógica de pontuação
    });

    document.getElementById('prova2').addEventListener('click', function() {
        alert('Prova de Habilidade completada! Você ganhou 20 pontos.');
        // Adicionar lógica de pontuação
    });

    document.getElementById('prova3').addEventListener('click', function() {
        alert('Prova de Observação completada! Você ganhou 30 pontos.');
        // Adicionar lógica de pontuação
    });

    const pedras = [
        { nome: 'Granito', id: 1 },
        { nome: 'Mármore', id: 2 },
        { nome: 'Basalto', id: 3 },
        { nome: 'Calcário', id: 4 },
        { nome: 'Diamante', id: 5 }
    ];

    const containerPedras = document.getElementById('pedras');
    pedras.forEach(pedra => {
        const div = document.createElement('div');
        div.className = 'pedra';
        div.innerText = pedra.nome;
        div.dataset.id = pedra.id;
        div.addEventListener('click', function() {
            if (pedra.id === 5) {
                alert('Você encontrou a pedra Diamante e a poliu! Agora você é um Companheiro.');
                currentFase++;
                showFase(currentFase);
            } else {
                alert('Esta não é a pedra correta. Continue procurando.');
            }
        });
        containerPedras.appendChild(div);
    });

    const lapidacaoContainer = document.getElementById('lapidacao');
    for (let i = 1; i <= 7; i++) {
        const div = document.createElement('div');
        div.className = 'pedra';
        div.innerText = `Pedra ${i}`;
        div.dataset.id = i;
        div.addEventListener('click', function() {
            alert(`Você lapidou a Pedra ${i}!`);
            if (i === 7) {
                alert('Parabéns! Você se tornou um Mestre Pedreiro.');
            }
        });
        lapidacaoContainer.appendChild(div);
    }

    showFase(currentFase);
    startTimer(5 * 60, timerElement); // 5 minutos de contagem regressiva
});

