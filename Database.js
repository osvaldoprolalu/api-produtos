const mongoose = require("mongoose");

const username = 'osvaldoprolalu';
const password = 'O8LIVcvro77jczDa';
const clusterUrl = 'cluster0.xwp4jqn.mongodb.net';
const database = 'nodeteste';

class Database {
    async _connect() {
        mongoose
            .connect(`mongodb+srv://${username}:${password}@${clusterUrl}/${database}`)
            .then(() => {
                console.log("Conectado no banco com sucesso");
            })
            .catch((error) => {
                console.error("Erro ao conectar no banco: " + error);
            });
    }
}

module.exports = new Database();
