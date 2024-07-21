document.addEventListener('DOMContentLoaded', function() {
    let currentFase = 1;

    const showFase = (fase) => {
        document.querySelectorAll('.fase').forEach(f => f.style.display = 'none');
        document.getElementById(`fase${fase}`).style.display = 'block';
    };

    const pessoas = [
        { nome: 'João', id: 1 },
        { nome: 'Maria', id: 2 },
        { nome: 'Carlos', id: 3 },
        { nome: 'Ana', id: 4 },
        { nome: 'Mestre Pedreiro', id: 5 }
    ];

    const pedras = [
        { nome: 'Granito', id: 1 },
        { nome: 'Mármore', id: 2 },
        { nome: 'Basalto', id: 3 },
        { nome: 'Calcário', id: 4 },
        { nome: 'Diamante', id: 5 }
    ];

    const containerPessoas = document.getElementById('pessoas');
    pessoas.forEach(pessoa => {
        const div = document.createElement('div');
        div.className = 'personagem';
        div.innerText = pessoa.nome;
        div.dataset.id = pessoa.id;
        div.addEventListener('click', function() {
            if (pessoa.id === 5) {
                alert('Você encontrou o Mestre Pedreiro! Agora você é um Aprendiz.');
                currentFase++;
                showFase(currentFase);
            } else {
                alert('Esta não é a pessoa correta. Continue procurando.');
            }
        });
        containerPessoas.appendChild(div);
    });

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
});

