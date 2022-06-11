const Discord = require('discord.js');

exports.run = async(client, message, args) => {
      if (!args[0])
      return message.channel.send(
        `Yavaş modu ayarlamam için bir sayı yazmalısın!`
      );
  if (args[0] > 1000) return message.channel.send("Slowmode en fazla 1000 olabilir.")
    if (isNaN(args[0])) return message.channel.send(`Bu bir sayı değil!`);
    let reason = message.content.slice(
      "p!" + 9 + args[0].length + 1
    );
    if (!reason) {
      reason == "Slowmode";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(
      `Artık bu kanala **${args[0]}** saniyede bir mesaj yazılabilecek.`
    );
};
exports.conf = {
    aliases: ['slowmode', 'yavaşmod'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)
    kategori: "Moderasyon" //Yardım komutunda hangi kategoride gözükeceğini ayarlarsınız

  };

  exports.help = {
    name: 'slowmode',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'Müslowmodezik', //Komutun açıklaması
    usage: 'slowmode', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };