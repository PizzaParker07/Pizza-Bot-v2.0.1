const Discord = require('discord.js')
const ayarlar = require('../config.json') 

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
  if (!channel) {
  
    return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    return message.channel.send("Duraklatabileceğim bir şarkı bulamadım.");
  }
  if(!serverQueue.playing) return message.channel.send('Şarkılar Zaten Duraklatılmış.')
  if(serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause(true)
    
    
    return message.channel.send("✅ | Oynatılan şarkı duraklatıldı.")
}  
}
    

  exports.conf = {
    aliases: ['durdur'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Müzik" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız

  };

  exports.help = {
    name: 'durdur',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'pause', //Komutun açıklaması
    usage: 'pause', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };