import api from "./api.js";

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const formCadastro = document.getElementById("formCadastro");
    const table = document.querySelector(".list_lojas");
    const searchInput = document.querySelector('.search-bar input'); // Adicionando o input de busca

    // Variável para rastrear o modo de edição
    let editandoLojaId = null;

    // Abrir modal para cadastro
    openModal.addEventListener("click", () => {
        editandoLojaId = null;
        formCadastro.reset();
        document.querySelector("h2").textContent = "Cadastrar Loja";
        document.getElementById("buttonModal").textContent = "Cadastrar";
        modal.classList.remove("hidden");
    });

    // Fechar modal
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));

    // Fechar ao clicar fora
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.classList.add("hidden");
    });

    // Função para listar lojas com suporte a busca
    function listarLojas(searchTerm = '') {
        table.innerHTML = `
            <tr>
                <th>Logo</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        `;
        const endpoint = searchTerm ? `lojas/list?search=${encodeURIComponent(searchTerm)}` : "lojas/list";
        api.get(endpoint)
            .then(data => {
                console.log("Dados recebidos da API:", data);
                
                data.forEach(loja => {
                    
                    // const logoUrl = loja.logo 
                    //     ? `http://127.0.0.1:8000/storage/${loja.logo}` 
                    //     : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABYSURBVFhH7daxDYAwDAPB/P9fOwgWOpBSCG6tB0FrgA8pGEEQhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhEIhhP4MC1iUwp3jAAAAAElFTkSuQmCC';
                    
                    const row = document.createElement("tr");
                    console.log(loja);
                    row.innerHTML = `
                        <td><img src="${loja.logo}" alt="" width="50"></td>
                        <td>${loja.nome_fantasia}</td>
                        <td>${loja.cnpj || "N/A"}</td>
                        <td>${loja.email}</td>
                        <td>${loja.telefone}</td>
                        <td>${loja.ativo === 1 ? "Ativo" : "Desativado"}</td>
                        <td>
                            <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded" data-id="${loja.id}">Editar</button>
                            <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-id="${loja.id}">Excluir</button>
                        </td>
                    `;
                    table.appendChild(row);
                });
    
                document.querySelectorAll(".edit-btn").forEach(btn => {
                    btn.addEventListener("click", (e) => editarLoja(e.target.dataset.id));
                });
                document.querySelectorAll(".delete-btn").forEach(btn => {
                    btn.addEventListener("click", (e) => excluirLoja(e.target.dataset.id));
                });
            })
            .catch(error => console.error("Erro ao buscar lojas:", error));
    }
    

    // Evento de busca
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        listarLojas(searchTerm);
    });

    // Listar lojas ao carregar a página
    listarLojas();

    // Função para editar loja
    function editarLoja(id) {
        api.get(`loja/${id}`)
            .then(loja => {
                if (loja) {
                    editandoLojaId = id;
                    document.getElementById("razao_social").value = loja.razao_social || "";
                    document.getElementById("nome_fantasia").value = loja.nome_fantasia || "";
                    document.getElementById("cnpj").value = loja.cnpj || "";
                    document.getElementById("descricao").value = loja.descricao || "";
                    document.getElementById("email").value = loja.email || "";
                    document.getElementById("telefone").value = loja.telefone || "";
                    document.querySelector("h2").textContent = "Editar Loja";
                    document.getElementById("buttonModal").textContent = "Editar";
                    modal.classList.remove("hidden");
                } else {
                    console.error("Loja não encontrada");
                }
            })
            .catch(error => console.error("Erro ao carregar loja para edição:", error));
    }

    // Função para excluir loja
    function excluirLoja(id) {
        if (confirm("Tem certeza que deseja excluir esta loja?")) {
            api.delete(`loja/delete/${id}`)
                .then(() => {
                    alert("Loja excluída com sucesso!");
                    listarLojas();
                })
                .catch(error => console.error("Erro ao excluir loja:", error));
        }
    }

    // Enviar dados do formulário (cadastro ou edição)
    formCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const razao_social = document.getElementById("razao_social").value.trim().toUpperCase();
        const nome_fantasia = document.getElementById("nome_fantasia").value.trim();
        const cnpj = document.getElementById("cnpj").value.replace(/\D/g, "");
        const logo = document.getElementById("logo").files[0];
        const descricao = document.getElementById("descricao").value || "Sem descrição";
        const email = document.getElementById("email").value.toLowerCase();
        const telefone = document.getElementById("telefone").value.replace(/\D/g, "");
    
        const formData = new FormData();
        formData.append("razao_social", razao_social);
        formData.append("nome_fantasia", nome_fantasia);
        formData.append("cnpj", cnpj);
        if (logo) formData.append("logo", logo);
        formData.append("descricao", descricao);
        formData.append("email", email);
        formData.append("telefone", telefone);
        if (editandoLojaId) formData.append("_method", "PUT");
    
        try {
            let response;
            if (editandoLojaId) {
                response = await api.post(`loja/update/${editandoLojaId}`, formData);
                alert("Loja editada com sucesso!");
            } else {
                response = await api.post("lojas/save", formData);
                alert("Loja cadastrada com sucesso!");
            }
            modal.classList.add("hidden");
            formCadastro.reset();
            editandoLojaId = null;
            listarLojas();
        } catch (error) {
            console.error("Erro ao salvar loja:", error);
        }
    });
});