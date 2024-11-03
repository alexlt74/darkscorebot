function fetchPredictions() {
    fetch('predictions.csv')
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').slice(1);  // Remove header
            const tableBody = document.getElementById("predictions-table");
            tableBody.innerHTML = '';  // Limpar a tabela

            rows.forEach(row => {
                if (row.trim().length > 0) {
                    const cols = row.split(',');
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${cols[0]}</td>
                        <td>${cols[1]}</td>
                        <td>${parseFloat(cols[2]).toFixed(2)}</td>
                        <td[_{{{CITATION{{{_1{](https://github.com/ifpb/html-guide/tree/9750443f462abfb8a5d1192b6e69e6682dce9aa6/html%2Fsyntax%2FREADME.md)[_{{{CITATION{{{_2{](https://github.com/ricardo-cas/pandas/tree/eefd8f3ed9250c15e029b7ae59a24ef9f7ffc4ab/GUIA_MARKDOWN.MD)