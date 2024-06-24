document.getElementById('consultaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const placa = document.getElementById('placa').value.toUpperCase();
    fetch('infracoes.txt')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = '';

            const infracoesEncontradas = linhas.filter(linha => {
                const campos = linha.split(' ');
                return campos[1] === placa;
            });

            if (infracoesEncontradas.length > 0) {
                const table = document.createElement('table');
                table.border = '1';

                const header = table.insertRow();
                const headers = ['NR AIT', 'PLACA', 'DT. AUTUAÇÃO', 'INFRAÇÃO', 'LOCAL', 'TIPO', 'DESC. INFRAÇÃO'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.appendChild(document.createTextNode(headerText));
                    header.appendChild(th);
                });

                infracoesEncontradas.forEach(linha => {
                    const campos = linha.split(' ');
                    const row = table.insertRow();
                    campos.forEach(campo => {
                        const cell = row.insertCell();
                        cell.appendChild(document.createTextNode(campo));
                    });
                });

                resultadoDiv.appendChild(table);
            } else {
                resultadoDiv.innerHTML = `<p>Nenhuma infração encontrada para a placa: ${placa}</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao ler o arquivo:', error);
        });
});
