const API_URL = "http://127.0.0.1:8000/api";

const api = {
    async get(endpoint = "") {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error("Erro no GET:", error);
        }
    },

    async post(endpoint = "", data) {
        try {
            console.log("Dados enviados ao POST:");
            if (data instanceof FormData) {
                for (let [key, value] of data.entries()) {
                    console.log(key, value);
                }
            } else {
                console.log(data);
            }
            const headers = data instanceof FormData ? {} : { "Content-Type": "application/json" };
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                body: data instanceof FormData ? data : JSON.stringify(data),
                headers
            });
            const result = await response.json();
            console.log("Resposta do servidor:", result);
            return result;
        } catch (error) {
            console.error("Erro no POST:", error);
            throw error;
        }
    },

    async put(endpoint = "", data) {
        try {
            console.log("Dados enviados ao PUT:", data);
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            console.log("Resposta do servidor:", JSON.stringify(result, null, 2));
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${JSON.stringify(result.errors || result, null, 2)}`);
            }
            return result;
        } catch (error) {
            console.error("Erro no PUT:", error);
            throw error;
        }
    },

    async delete(endpoint = "") {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "DELETE",
                headers: {}
            });
            const result = await response.json();
            console.log("Resposta do servidor:", result);
            return result;
        } catch (error) {
            console.error("Erro no DELETE:", error);
            throw error;
        }
    },

    async getLojas() {
        try {
            const response = await fetch(`${API_URL}/api/admin/lojas/list`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${'9|PTcTWPkxwL3Wdg1v3wnBKQiJxg0N9LoiLHLSZywe'}`,
                    "Content-Type": "application/json"
                }
            });
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar lojas:", error);
        }
    }
    
};

export default api;