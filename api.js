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
                const campos = linha.split(' ; ');
                return campos[1] === placa;
            });

            const quantidadeInfracoes = infracoesEncontradas.length;

            if (quantidadeInfracoes > 0) {
                resultadoDiv.innerHTML = `<p class="alert alert-info">Número de notificações encontradas para a placa ${placa}: ${quantidadeInfracoes}</p>`;

                const table = document.createElement('table');
                table.classList.add('table', 'table-bordered', 'mt-4');

                const header = table.insertRow();
                const headers = ['NR AIT', 'PLACA', 'DT. AUTUAÇÃO', 'INFRAÇÃO', 'LOCAL', 'TIPO', 'DESC. INFRAÇÃO'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.appendChild(document.createTextNode(headerText));
                    header.appendChild(th);
                });

                infracoesEncontradas.forEach(linha => {
                    const campos = linha.split(' ; ');
                    const row = table.insertRow();
                    campos.forEach(campo => {
                        const cell = row.insertCell();
                        cell.appendChild(document.createTextNode(campo));
                    });
                });

                resultadoDiv.appendChild(table);
            } else {
                resultadoDiv.innerHTML = `<p class="alert alert-warning">Nenhuma infração encontrada para a placa: ${placa}</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao ler o arquivo:', error);
        });
});
