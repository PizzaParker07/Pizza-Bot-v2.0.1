const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send('Hey Bu Ayarı Kullanabilmek için `aç` yada `kapat` yazmalısın!')
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    var i = await db.set(`reklam_${message.guild.id}`, 'acik')
   
    message.channel.send(new Discord.MessageEmbed().setColor("RED").addField("**Durum:**","Reklam koruma açıldı").addField("İşlem Yapan:",message.author.username).setTimestamp().addField("**Sonuç:**","Başarılı"))
    }
  
  if (args[0] == 'kapat') {
    var i = await db.set (`reklam_${message.guild.id}`, 'kapali')
    message.channel.send(new Discord.MessageEmbed().setColor("RED").addField("**Durum:**","Reklam koruma kapatıldı").addField("İşlem Yapan:",message.author.username).setTimestamp().addField("**Sonuç:**","Başarılı"))
    }
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['advertisement','reklam', 'reklam-engel'],
  permLevel: 0
};

exports.help = {
  name: 'reklamengel',
  description: '[Admin Komutu]',
  usage: 'reklamengel'
};