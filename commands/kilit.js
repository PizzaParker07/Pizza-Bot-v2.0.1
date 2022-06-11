const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return;

let channel = message.mentions.channels.first() || message.channel;

let reason;
if(!message.mentions.channels.first()) {
if(args[0]) reason = args.slice(0).join(' ');
};
if(message.mentions.channels.first()) {
if(args[1]) reason = args.slice(1).join(' ');
};

let reasonn;
if(!reason) reasonn = '. Sebep belirtilmedi.';
if(reason) reasonn = `  ${reason} sebebiyle.`;
message.channel.send(`${channel} adlı kanal kilitlendi.`).then(m => m.delete({timeout: 7000}));

let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false }, ' '+message.author.tag + ' tarafından kilitlendi.');
channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setTitle(channel.name+' adlı kanal kilitlendi.')
.setDescription(`${reasonn} sebebiyle kanal kilitlendi. Lütfen saygı duyun.`));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'kilit'
};