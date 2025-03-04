const bcrypt = require('bcrypt');
const usersDAO = require('../dao/usersDAO');

class usersCotroller {
    static async loginUser(db, email, senha) {
        const user = await usersDAO.getUserByEmail(db, email);
        console.log(senha)
        if (user && await bcrypt.compare(senha, user.senha)) {
            return { success: true, message: "Login realizado com sucesso!"};
        }
        return { success: false, message: "Login falhou!" };
    }
    static async insertUser(db, user) {
        await usersDAO.insertUser(db, user);
    }
}

module.exports = usersCotroller;
