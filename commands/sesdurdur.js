const Discord = require('discord.js')
const ayarlar = require('../config.json') 

exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Lütfen bir kanala giriniz.");
    message.guild.members.cache.get(ayarlar.clientId).voice.setMute(true);
    
}
    

  exports.conf = {
    aliases: ['sesdurdur'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Müzik" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız
  };

  exports.help = {
    name: 'sesdurdur',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'sesdurdur', //Komutun açıklaması
    usage: 'sesdurdur', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };