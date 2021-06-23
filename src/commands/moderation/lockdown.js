const { MessageEmbed } = require('discord.js');
const Command = require('../../struct/Command');

class PingCommand extends Command {
  constructor() {
    super({
      id: 'ping',
      aliases: ['p'],
      cooldown: 3,
    });
  }

  exec(message, args) {
    message.delete();

    console.log(this.client.guilds.cache.map((guild) => guild.name).join(', '));
    // if (!message.member.permission.has('MANAGE_PERMISSIONS')) return;
    const lockdownReason = args[0];
    const ignored = new Set([]);
    const serverChannels = message.guild.channels.cache.filter((ch) => ch.type !== 'category');
    if (!lockdownReason) return message.channel.send('Provide a reason to the channel');

    serverChannels.forEach((channel) => {
      if (!ignored.has(channel.id)) {
        if (channel.type === 'text') {
          channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
          channel.send(`<a:read:746004477772955718> This server is under lockdown visit <#732903985047928842> for moreinfo`);
        } else if (channel.type === 'voice') {
          channel.updateOverwrite(channel.guild.roles.everyone, { CONNECT: false });
        }
      }
    });

    const currentdate = new Date();
    const datetime = currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear() + ' at ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();

    const lockmsg = new MessageEmbed()
      .setColor('#0099ff')
      .setAuthor('Server locked', 'https://i.imgur.com/XgTHhQ6.png')
      .setDescription(`<a:read:746004477772955718> The channel is been locked.\n\n\n Reason: **${lockdownReason}** `)
      .setFooter(datetime);
    message.guild.channels.cache.find((ch) => ch.name === 'logs').send(lockmsg);
  }
}

module.exports = PingCommand;