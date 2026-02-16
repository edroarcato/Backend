const { MongoClient } = require ("mongodb");

const url = "mongodb+srv://:@/";

const client = new MongoClient(url)

let db = null;

async function conectarDb() {
    try {
    if (db == null) {
        await client.connect();
        db = client.db("agenda");
    }
    console.log("Conectado ao MongoDB");
    return db;
  } catch (e) {
    console.log("Erro ao conectar no MongoDB", e.message);
  }
}

module.exports = conectarDb;