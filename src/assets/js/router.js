$(document).ready(function () {
    function loadPage(page) {
        $("#app").fadeOut(200, function () {
            $("#app").load(`src/pages/${page}/index.html`, function (response, status) {
                if (status === "error") {
                    $("#app").html("<p>Erro ao carregar a página.</p>");
                } else {
                    $("#app").fadeIn(200);

                    // Atualiza a classe active nos itens do menu
                    $("nav ul li").removeClass("active");
                    $(`nav ul li a[data-page='${page}']`).parent().addClass("active");
                }
            });
        });

        window.history.pushState(null, "", `#${page}`);
    }

    // Captura cliques nos links de navegação
    $(document).on("click", "nav a", function (e) {
        e.preventDefault();
        let page = $(this).attr("data-page");
        loadPage(page);
    });

    // Verifica se há um hash na URL e carrega a página correta
    let initialPage = window.location.hash.replace("#", "") || "home";
    loadPage(initialPage);
});
