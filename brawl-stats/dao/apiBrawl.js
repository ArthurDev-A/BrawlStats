require('dotenv').config();
const apiKey = process.env.API_KEY;
const urlBase = process.env.URL_BASE_BRAWL;

class apiBrawl {
    static async getPlayerStats(tag) {
        if (tag[0] !== '#') {
            tag = '#'+tag;
        }

        const url = urlBase + 'players/' + encodeURIComponent(tag);

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
            return
        }
    }
    static async getBrawlers() {
        const url = urlBase + 'brawlers';

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
            console.error("🚨 Erro ao buscar os dados dos brawlers:", data);
            return;
            }
            return data
        } catch (error) {
            console.error("🚨 Erro ao buscar os dados dos brawlers:", error);
            return;
        }
    }
}

module.exports = apiBrawl;