const bcrypt = require('bcrypt');
const usersDAO = require('../dao/usersDAO');

class usersCotroller {
    static async loginUser(email, senha) {
        const user = await usersDAO.getUserByEmail(email);
        
        if (user && await bcrypt.compare(senha, user.senha)) {
            return { success: true, message: "Login realizado com sucesso!"};
        }
        return { success: false, message: "Login falhou!" };
    }
    static async insertUser(user) {
        return await usersDAO.insertUser(user);
    }
}

module.exports = usersCotroller;
