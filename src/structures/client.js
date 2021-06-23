require("dotenv/config");
const { Client, Collection } = require("discord.js");
const { eventRegistry, commandRegistry } = require("../registries/export/index");

module.exports = class EcoBot extends Client {
    constructor() {
        super({
            disableMentions: "everyone",
        });

        this.events = new Collection();

        this.commands = new Collection();

        this.aliases = new Collection();

        this.prefix = process.env.PREFIX;

        this.commandsUsed = 0;
    }

    async start() {
        eventRegistry(this);
        commandRegistry(this);
        super.login(process.env.BOT_TOKEN);
    }
};
