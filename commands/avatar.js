const Discord = require('discord.js');

exports.run = async (client, message, args) => {// can#0002

let target = message.mentions.users.first() || message.author;
message.channel.send(new Discord.MessageEmbed()
.setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
.setTitle('Avatar')
.setImage(target.displayAvatarURL({ dynamic: true, size: 512 })));
                     
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ['av'],
  kategori: 'Genel'
};
 
exports.help = {
  name: 'avatar',
  description: 'Belirtiğiniz Kullanıcının Avatarını Gösterir',
  usage: 'avatar <@kullanıcı>',

};
