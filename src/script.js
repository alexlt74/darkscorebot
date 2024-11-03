function fetchPredictions() {
    fetch('http://localhost:8000/predictions.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar previsões: ' + response.statusText);
            }
            return response.text();
        })
        .then(text => {
            console.log('CSV data:', text);  // Isso ajuda a depurar
            const rows = text.split('\n').slice(1);  // Remove o cabeçalho
            const tableBody = document.getElementById("predictions-table");
            tableBody.innerHTML = '';  // Limpar a tabela

            rows.forEach(row => {
                const cols = row.split(',');
                if (cols.length >= 8) {  // Certifique-se de que há pelo menos 8 colunas
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${cols[2]}</td>  // Data
                        <td>${cols[3]}</td>  // Hora
                        <td>${cols[0]}</td>  // Time da Casa
                        <td>${cols[1]}</td>  // Visitante
                        <td>${parseFloat(cols[4]).toFixed(2)}</td>  // Previsão de Gols
                        <td>${cols[5]}</td>  // Previsão de Vencedor
                        <td>${cols[6]}</td>  // Previsão de Escanteios
                        <td>${cols[7]}</td>  // Previsão de Cartões
                    `;
                    tableBody.appendChild(tr);
                }
            });
        })
        .catch(error => console.error('Erro ao buscar previsões:', error));
}

// Buscar previsões ao carregar a página
fetchPredictions();
