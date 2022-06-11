const Discord = require('discord.js')
const ayarlar = require('../config.json') 

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
  if (!channel) {
   
    return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    return message.channel.send("Kuyrukta şarkı bulamadım.");
  }

  message.channel.send(
    `${serverQueue.songs
      .map((song, index) => index + 1 + ". " + song.title)
      .join("\n\n")}`,
    { split: true }
  );
}
    

  exports.conf = {
    aliases: ['queue'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Müzik" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız

  };

  exports.help = {
    name: 'queue',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'queue', //Komutun açıklaması
    usage: 'queue', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };