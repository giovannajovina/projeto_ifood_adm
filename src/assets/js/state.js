
const AppState = {
    user: null,  // Armazena dados do usuário
    data: {},    // Armazena dados gerais
    setUser(userData) {
        this.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
    },
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    },
    setData(key, value) {
        this.data[key] = value;
    },
    getData(key) {
        return this.data[key];
    }
};

/**
 * 
 *  Gerenciador de estado basico
 *  Dev: Alexandre Muniz
 * 
 *  Exemplo de uso:
 *  AppState.setUser({ name: "Alex", email: "alex@email.com" });
 *  console.log(AppState.getUser());
 * 
 */
