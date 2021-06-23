const Event = require("../structures/bases/eventBase");
const chalk = require("chalk");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "ready",
            once: true,
        });
    }

    async execute() {
        console.log(chalk.cyan("[BOT] ") + this.client.user.tag + " is now online.");
    }
};
