const Command = require("../structures/bases/commandBase");
const Embed = require("../structures/embed");
require("moment-duration-format");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "lockdown",
            description: "Lockdown the server!",
        });
    }

    async execute(message, args) {
    message.delete();

     if(!message.member.hasPermission("ADMINISTATOR")) return;
     const lockdownReason = args[0];
     const ignored = new Set(["853469341646716960", "853469367865573386", "853317838168391690", "853469442898001920", // staff channels
    "854595915583193109", "854596020218495046", "854695067347058688", "856867360026787870",// logs
    "857139930068287489",
]); 
     const serverChannels = message.guild.channels.cache.filter(ch => ch.type !== "category");
     if(!lockdownReason) return message.channel.send("Provide a reason to the channel");

     serverChannels.forEach(channel => {
         if(!ignored.has(channel.id)) {
             if(channel.type === "text") {
                channel.updateOverwrite(channel.guild.roles.cache.get("853323459098443776"), { VIEW_CHANNEL: false });
                // channel.send("<a:read:746004477772955718> This server is under lockdown visit <#732903985047928842> for moreinfo");
             } else if(channel.type === "voice") {
                channel.updateOverwrite(channel.guild.roles.cache.get("853323459098443776"), { VIEW_CHANNEL: false });
             } else if(channel.type === "news") {
                channel.updateOverwrite(channel.guild.roles.cache.get("853323459098443776"), { VIEW_CHANNEL: false });
             } 
         }
     });

     message.guild.channels.cache.get("857139930068287489") .updateOverwrite(message.guild.roles.cache.get("853323459098443776"), { VIEW_CHANNEL: true, SEND_MESSAGES: false });
     
     const purgechannel = message.guild.channels.cache.get("857139930068287489");
     purgechannel.bulkDelete(100);
     
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " at "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

     const lockmessage = new Embed()
     .setColor("#0099ff")
     .setAuthor("Server locked", "https://cdn.discordapp.com/emojis/752490207886049431.gif")
     .setDescription(`<a:codered:857150846215389194>  The server is in lockdown.\n\n\n Reason: **${lockdownReason}** `)
     .setFooter(datetime);
    message.guild.channels.cache.find(ch => ch.name === "🔒┃lockdown").send(lockmessage);
    }
};
