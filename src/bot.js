const Client = require('./client/Client.js');
const config = require('../config.json');
const client = new Client(config, { ws: { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"] } });
client.start();