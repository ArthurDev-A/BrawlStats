const bcrypt = require('bcrypt');

class usersDAO {
    static async getUserByEmail(client, email) {
        try {
            const user = await client.findOne({ email: email }, { projection: { _id: 0 } });
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    static async insertUser(client, doc) {
        try {
            // Verifica se o usuário já existe
            const existingUser = await client.findOne({ email: doc.email });
            if (existingUser) {
                throw new Error('Usuário já existe');
            }

            const salt = await bcrypt.genSalt(10);
            doc.senha = await bcrypt.hash(doc.senha, salt);
            const result = await client.insertOne(doc);
            return result;
        } catch (err) {
            console.log(err);
            throw new Error('Erro ao inserir usuário');
        }
    }
}

module.exports = usersDAO;