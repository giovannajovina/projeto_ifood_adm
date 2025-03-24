# Projeto DevFood - Plataforma de Gestão de Lojas

Este projeto é uma plataforma web modular para gestão de lojas, desenvolvida com HTML, CSS, JavaScript e jQuery. A aplicação carrega páginas dinamicamente sem recarregar a página principal e consome uma API externa para exibir informações.

## Funcionalidades
- Navegação dinâmica entre páginas (SPA-like)  
- Sidebar fixa e carregada dinamicamente  
- Consumo de API externa para exibição de lojas  
- Gerenciamento de estado para compartilhar dados entre páginas  
- Estilização modular com CSS organizado por responsabilidade  

## Estrutura do Projeto
```
/src
  ├── /assets
  │   ├── /css
  │   │   ├── global.css        # Estilos globais do projeto
  │   │   ├── sidebar.css       # Estilos do Sidebar
  │   ├── /js
  │   │   ├── api.js            # Funções para consumo da API externa
  │   │   ├── router.js         # Gerencia navegação dinâmica entre views
  │   │   ├── sidebar.js        # Carrega a sidebar dinamicamente
  │   │   ├── state.js          # Gerencia estado global da aplicação
  │   ├── /images               # Imagens do projeto
  │
  ├── /components
  │   ├── sidebar.html          # Estrutura do Sidebar
  │
  ├── /pages
  │   ├── /home
  │   │   ├── index.html        # Página inicial
  │   │   ├── style.css
  │   ├── /lojas
  │   │   ├── index.html        # Página de lojas
  │   │   ├── style.css         # Estilos da página de lojas
  │   │   ├── lojas.js          # Lógica para buscar e exibir lojas
  │
  ├── index.html                # Página principal que carrega as views dinamicamente
```

## Tecnologias Utilizadas
- **HTML5** → Estrutura do projeto  
- **CSS3** → Estilização modular  
- **JavaScript (ES6)** → Interatividade e consumo da API  
- **jQuery** → Manipulação do DOM e requisições AJAX  
- **Fetch API** → Comunicação com API externa  

## Como Executar o Projeto
### 1. Clone o repositório
```sh
git clone https://github.com/seu-usuario/devfood.git
```
### 2. Acesse o diretório
```sh
cd devfood
```
### 3. Abra o `index.html` no navegador
Basta abrir o `index.html` diretamente no navegador ou utilizar um servidor local como o Live Server do VS Code.

## Como Funciona o Sistema de Navegação
A navegação funciona através do `router.js`, que carrega dinamicamente as páginas dentro do `<div id="app">`.  
Exemplo:  
- Quando o usuário clica em "Lojas", o JavaScript carrega `src/pages/lojas/index.html` sem recarregar a página.  
- O menu Sidebar permanece fixo, carregado dinamicamente em `sidebar.js`.

## Consumo da API
O sistema busca informações da API e exibe dinamicamente.  
Exemplo de requisição no `lojas.js`:
```js
fetch("https://api.exemplo.com/lojas")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Erro ao buscar lojas:", error));
```

## Contribuição
Sinta-se à vontade para abrir um pull request ou sugerir melhorias via issues.  
