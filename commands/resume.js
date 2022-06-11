const Discord = require('discord.js')
const ayarlar = require('../config.json') 

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
  if (!channel) {
 
    return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
  }

  const serverQueue = message.client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send('Oynatılan bir şarkı Bulunmuyor.')
  if(serverQueue.playing) return message.channel.send(`Duran bir şarkı yok.`)
if(serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume(true)

return message.channel.send("✅ | Duraklatılan şarkı sürdürüldü.") 
}
  
  message.channel.send("Duraklatılan bir şarkı yok.")
  
}
    

  exports.conf = {
    aliases: ['resume'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Müzik" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız

  };

  exports.help = {
    name: 'devam',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'resume', //Komutun açıklaması
    usage: 'resume', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };
  