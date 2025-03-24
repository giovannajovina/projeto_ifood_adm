const API_URL = "https://clickfood.shop";
// const API_URL = "http://127.0.1:8000";

function fetchData(endpoint, callback) {
    $.ajax({
        url: `${API_URL}/${endpoint}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            callback(data);
        },
        error: function (err) {
            console.error("Erro ao buscar dados:", err);
        }
    });
}

// Exemplo de uso:
// fetchData("users", function(data) { console.log(data); });
