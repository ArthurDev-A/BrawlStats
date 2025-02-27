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
            const salt = await bcrypt.genSalt(10);
            doc.password = await bcrypt.hash(doc.password, salt);
            const result = await client.insertOne(doc);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = usersDAO;