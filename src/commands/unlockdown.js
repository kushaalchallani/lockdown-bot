const Command = require("../structures/bases/commandBase");
require("moment-duration-format");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "unlockdown",
            description: "Lockdown the server!",
        });
    }

    async execute(message) {
        message.delete();

        const purgechannel = message.guild.channels.cache.get("857139930068287489");
        purgechannel.bulkDelete(100);

        message.guild.channels.cache.find((ch) => ch.name === "🔒┃lockdown");
        if (!message.member.hasPermission("ADMINISTATOR")) return;
        const ignored = new Set([
            "853469341646716960",
            "853469367865573386",
            "853317838168391690",
            "853469442898001920", // staff channels
            "854595915583193109",
            "854596020218495046",
            "854695067347058688",
            "856867360026787870", // logs
            "853316000334348288",
            "856786023928954890",
            "853316017073160233",
            "853323425606008842",
            "853323392844300308",
        ]);
        const serverChannels = message.guild.channels.cache.filter((ch) => ch.type !== "category");

        serverChannels.forEach((channel) => {
            if (!ignored.has(channel.id)) {
                if (channel.type === "text") {
                    channel.updateOverwrite(channel.guild.roles.cache.get("853323459098443776"), {
                        VIEW_CHANNEL: true,
                    });
                    channel.send("<a:codered:857150846215389194> The server is now unlocked! Enjoy!");
                } else if (channel.type === "voice") {
                    channel.updateOverwrite(channel.guild.roles.cache.get("853323459098443776"), {
                        VIEW_CHANNEL: true,
                    });
                } else if (channel.type === "news") {
                    channel.updateOverwrite(channel.guild.roles.cache.get("853323459098443776"), {
                        VIEW_CHANNEL: true,
                    });
                }
            }
        });

        message.guild.channels.cache
            .get("857139930068287489")
            .updateOverwrite(message.guild.roles.cache.get("853323459098443776"), { VIEW_CHANNEL: false });
    }
};
