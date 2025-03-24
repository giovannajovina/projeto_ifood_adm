document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://api.exemplo.com/lojas"; // Substitua pela URL real da API
    const tableBody = document.getElementById("lojas-table-body");

    // Função para carregar lojas da API
    function carregarLojas() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ""; // Limpa conteúdo anterior
                
                data.forEach(loja => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><img src="${loja.logo}" alt="Logo" width="50"></td>
                        <td>${loja.nome}</td>
                        <td>${loja.cnpj}</td>
                        <td>${loja.email}</td>
                        <td>${loja.telefone}</td>
                        <td>${loja.status}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Erro ao buscar lojas:", error);
                tableBody.innerHTML = `<tr><td colspan="6">Erro ao carregar lojas.</td></tr>`;
            });
    }

    carregarLojas();
});
