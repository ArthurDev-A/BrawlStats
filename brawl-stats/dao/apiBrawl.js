require('dotenv').config();
const apiKey = process.env.API_KEY;
const urlBase = process.env.URL_BASE_BRAWL;

class apiBrawl {
    static async getPlayerStats(tag) {
        const url = urlBase + encodeURIComponent(tag);

        try {
            const response = await fetch(url, {
               method: "GET",
               headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
               }
            });
            const data = await response.json();
            
            if (!response.ok) {
            console.error("🚨 Erro ao buscar os dados:", data);
            return;
            }
            return data
        } catch (error) {
            console.error("🚨 Erro ao buscar os dados:", error);
        }
    }
}

module.exports = apiBrawl;