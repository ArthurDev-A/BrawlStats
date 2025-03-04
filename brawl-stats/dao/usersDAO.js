const bcrypt = require('bcrypt');
const userDB = require('./userDb');
require('dotenv').config();

const dbName = process.env.NAME_DB;

class usersDAO {
    static async getUserByEmail(email) {
        try {
            const db = await userDB.connectDB(dbName);
            const user = await db.collection('users').findOne({ email: email }, { projection: { _id: 0 } });
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    static async insertUser(doc) {
        try {
            const db = await userDB.connectDB(dbName);

            const existingUser = await db.collection('users').findOne({ email: doc.email });
            if (existingUser) {
                return { acknowledged: false };
            }
            
            const salt = await bcrypt.genSalt(10);
            doc.senha = await bcrypt.hash(doc.senha, salt);
            const result = await db.collection('users').insertOne(doc);
            return result;
        } catch (err) {
            console.log(err);
            throw new Error('Erro ao inserir usuário');
        }
    }
}

module.exports = usersDAO;