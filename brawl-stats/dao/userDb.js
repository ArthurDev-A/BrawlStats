const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.URI;
const client = new MongoClient(uri);

class userDb {
    static async connectDB(dbName) {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        return client.db(dbName);
    }
}

module.exports = userDb;
