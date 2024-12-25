function atualizarRelogio() {
    const elementoRelogio = document.getElementById('relogio');
    if (!elementoRelogio) {
        console.error('Elemento com id "relogio" não encontrado no HTML.');
        return;
    }

    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');

    elementoRelogio.textContent = `${horas}:${minutos}:${segundos}`;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);

// Inicializa o relógio imediatamente ao carregar o script
atualizarRelogio();
