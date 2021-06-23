require("dotenv/config");
const Event = require("../structures/bases/eventBase");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "message",
        });
    }

    async execute(message) {
        if (!message.guild) return;

        const prefix = this.client.prefix;

        if (!message.content.startsWith(prefix)) return;
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        const [commandName, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command =
            this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName));

        if (!command) return;

        try {
            command.execute(message, args, prefix);
        } catch (error) {
            console.log(`There was an error while executing a command: ${error}`);
            message.channel.send(error);
        }
    }
};
