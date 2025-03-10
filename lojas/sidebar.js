document.addEventListener("DOMContentLoaded", function () {
    const sidebarHTML = `
        <div class="sidebar">
            <h2>DevFood</h2>
            <div class="store-status">Loja fechada<br>Gestor de Pedidos fechado</div>
            <ul>
                <li><a href="categorias.html">Categorias</a></li>
                <li><a href="banners.html">Banners</a></li>
                <li><a href="pedidos.html">Pedidos <span class="notification">1</span></a></li>
                <li class="active"><a href="index.html">Lojas</a></li>
                <li><a href="configProdutos.html">Produtos</a></li>
                <li><a href="usuarios.html">Usuarios <span class="new-badge">NOVO</span></a></li>
            </ul>
        </div>
    `;

    document.getElementById("sidebar-container").innerHTML = sidebarHTML;

    // Força a revalidação dos estilos após injeção do HTML
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            background-color: #f5f5f5;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 235px;
            height: 100vh;
            background-color: #fff;
            padding: 15px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
        }

        .sidebar a {
            text-decoration: none;
            color: black;
        }

        .sidebar a:hover {
            color: red;
        }

        .main-content {
            flex: 1;
            padding: 20px;
            margin-left: 250px;
        }
    `;
    document.head.appendChild(styleSheet);
});
