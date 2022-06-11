const Discord = require('discord.js')
const ayarlar = require('../config.json') 

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.channel.send("Döngüye alabileceğim bir şarkı bulamadım.");
    }
    serverQueue.loop = !serverQueue.loop
    message.channel.send(`Döngü şimdi **${serverQueue.loop ? "Aktif" : "Deaktif"}**`)
}
    

  exports.conf = {
    aliases: ['döngü'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Müzik" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız

  };

  exports.help = {
    name: 'döngü',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'Loop.', //Komutun açıklaması
    usage: 'döngü', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };
