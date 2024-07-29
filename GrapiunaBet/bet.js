document.addEventListener('DOMContentLoaded', () => {
    const betForm = document.getElementById('betForm');
    const previewButton = document.getElementById('previewButton');
    const confirmButton = document.getElementById('confirmButton');
    const finalizeBet = document.getElementById('finalizeBet');
    const betSummary = document.getElementById('betSummary');
    const summaryType = document.getElementById('summaryType');
    const summaryAmount = document.getElementById('summaryAmount');
    const qrCode = document.getElementById('qrCode');

    previewButton.addEventListener('click', () => {
        const betType = document.getElementById('betType').value;
        const amount = document.getElementById('amount').value;

        if (betType && amount) {
            let betTypeText = '';
            switch (betType) {
                case 'homeWin':
                    betTypeText = 'Ganhador da Casa (Flamengo)';
                    break;
                case 'awayWin':
                    betTypeText = 'Ganhador de Fora (Palmeiras)';
                    break;
                case 'draw':
                    betTypeText = 'Empate';
                    break;
                case 'noGoal':
                    betTypeText = 'Sem Gol';
                    break;
                default:
                    betTypeText = 'Tipo de aposta desconhecido';
            }

            summaryType.textContent = betTypeText;
            summaryAmount.textContent = amount;
            betSummary.classList.remove('d-none');
            confirmButton.classList.remove('d-none');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    finalizeBet.addEventListener('click', (event) => {
        event.preventDefault();
        
        const betType = document.getElementById('betType').value;
        const amount = document.getElementById('amount').value;
        const dateTime = new Date().toLocaleString();

        // Gerar QR Code com informações da aposta
        const qrData = `Aposta: ${document.getElementById('summaryType').textContent}\nValor: R$${document.getElementById('summaryAmount').textContent}\nData e Hora: ${dateTime}`;
        $(qrCode).empty().qrcode({
            text: qrData,
            width: 128,
            height: 128
        });

        alert('Aposta confirmada! Um QR Code foi gerado como extrato.');
        betForm.reset();
        betSummary.classList.add('d-none');
        confirmButton.classList.add('d-none');
    });
});

