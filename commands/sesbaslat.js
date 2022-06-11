const Discord = require('discord.js')
const ayarlar = require('../config.json') 

exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Lütfen bir kanala giriniz.");
    message.member.voice.channel.join().then(rifleman => {
        message.guild.members.cache.get(ayarlar.clientId).voice.setMute(false);
        rifleman.voice.setSelfMute(false);
        rifleman.voice.setSelfDeaf(true);
        client.on('voiceStateUpdate', (youth, anasia) => {
              const writer = rifleman.play('soviet-anthem-misheard-turkce-versiyon (1).mp3')
              writer.on("finish", ()=>{
                message.member.voice.channel.leave();
              })
        });
      });
}
    

  exports.conf = {
    aliases: ['sesbaslat', "s"], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Müzik" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız
  };

  exports.help = {
    name: 'sesbaslat',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'Komutlar hakkında bilgi verir.', //Komutun açıklaması
    usage: 'sesbaslat', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };