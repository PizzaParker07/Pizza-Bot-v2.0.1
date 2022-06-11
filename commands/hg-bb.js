const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || "b!"; 
    let channel = message.mentions.channels.first()
    let arglar = ["aç", "kapat", "giriş-mesaj", "giriş-mesaj-kapat", "çıkış-mesaj", "çıkış-mesaj-kapat", "resim"]

  const embed1 = new Discord.MessageEmbed()
    .setColor(0x36393E)
    .setThumbnail(client.user.avatarURL, true)
    .setTitle(':tada: Resimli HG-BB Ayarlama')
    .addField(`:tada: ${prefix}hgbb aç #kanal ▸`, 'Resimli HG-BB kanalını ayarlar.', true)
    .addField(`:tada: ${prefix}hgbb kapat ▸`, 'Resimli HG-BB kapatır.', true)
    .addField('\u200b', '\u200b')
    .addField(`:tada: ${prefix}hgbb giriş-mesaj ▸`, 'Giriş mesajını ayarlar.', true)
    .addField(`:tada: ${prefix}hgbb giriş-mesaj-kapat ▸`, "Giriş mesajını bot'un orjinal mesajlarına dönderir.", true)
    .addField('\u200b', '\u200b')
    .addField(`:tada: ${prefix}hgbb çıkış-mesaj ▸`, 'Çıkış mesajını ayarlar.', true)
    .addField(`:tada: ${prefix}hgbb çıkış-mesaj-kapat ▸`, "Çıkış mesajını bot'un orjinal mesajlarına dönderir.", true)
    .addField('\u200b', '\u200b')
    .addField(`:tada: ${prefix}hgbb resim ▸`, 'Sizler için hazırladığımız resimlerden birini seçin.', true)
    .addField(`:tada: ${prefix}hgbb resim-sıfırla ▸`, 'Orjinal resime döner.', true)
    .addField(`:tada: ${prefix}hgbb resimler ▸`, 'HG-BB Resimlerini gösterir.', true)
    .setDescription('<a:dikkat:612682454326837251> NOT: giriş ve çıkış mesajları için; giren üyeyi belirtmek için {uye}, sunucu adı belirtmek için {sunucu} yazınız.', true)
    .setTimestamp()
    .setFooter('© 2022-2023')


   if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Hoşgeldin kanalı ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
   if (!args[0]) return message.channel.send(embed1)
   //if (args[0] !== arglar) return message.channel.send(embed1)
    if (args[0] == "aç") {
      if (!channel) return message.channel.send(`:x: Doğru kullanım ▸ ${prefix}hgbb aç #kanal`)
      if (channel) {
        db.set(`gcc_${message.guild.id}`, channel.id)
           const ee = new Discord.MessageEmbed()
            .setDescription(` » Giriş Çıkış kanalı başarıyla ${channel} olarak ayarlandı!`)
            .setColor("GREEN")
            message.channel.send(ee)
      }
    }
    if (args[0] == "kapat") {
      db.delete(`gcc_${message.guild.id}`)
      const xx = new Discord.MessageEmbed()
          .setDescription(` » Giriş Çıkış kanalı başarıyla sıfırlandı`)
          .setColor("RED")
          message.channel.send(xx)
    }
    if (args[0] == "giriş-mesaj") {
      let gms = args.slice(1).join(' ');
      db.set(`girisM_${message.guild.id}`, gms)
      const gm = new Discord.MessageEmbed()
          .setDescription(` » Giriş Mesajı başarıyla ayarlandı \n Mesaj: ${gms}`)
          .setColor("GREEN")
          message.channel.send(gm)      
    }
    if (args[0] == "giriş-mesaj-kapat") {
      db.delete(`girisM_${message.guild.id}`)
      const gmk = new Discord.MessageEmbed()
          .setDescription(` » Giriş Mesajı Başarı İle Orjinaline Dönderildi`)
          .setColor("RED")
          message.channel.send(gmk)     
    }
    if (args[0] == "çıkış-mesaj") {
      let cms = args.slice(1).join(' ');
      db.set(`cikisM_${message.guild.id}`, cms)
      const cm = new Discord.MessageEmbed()
          .setDescription(` » Çıkış Mesajı başarıyla ayarlandı \n Mesaj: ${cms}`)
          .setColor("GREEN")
          message.channel.send(cm)      
    }
    if (args[0] == "çıkış-mesaj-kapat") {
      db.delete(`cikisM_${message.guild.id}`)
      const cmk = new Discord.MessageEmbed()
          .setDescription(` » Çıkış Mesajı Başarı İle Orjinaline Dönderildi`)
          .setColor("RED")
          message.channel.send(cmk)     
    }
    if (args[0] == "resim") {
      if (!args[1]) return message.channel.send(`:x: » doğru kullanım ${prefix}hgbb resim [<minecraft-1/minecraft-2/istanbul>]`);
      if (args[1] == "minecraft-1" || "minecraft-2" || "istanbul") 
      db.set(`gcc_resim_${message.guild.id}`, args[1])
      const cmk = new Discord.MessageEmbed()
          .setDescription(` » Resim ${args[1]} olarak seçildi!`)
          .setColor("GREEN")
          message.channel.send(cmk)     
    }
    if (args[0] == "resim-sıfırla") {
      db.delete(`gcc_resim_${message.guild.id}`)
      const cmk = new Discord.MessageEmbed()
          .setDescription(` » HG-BB resmi başarıyla Orjinaline dönderildi`)
          .setColor("GREEN")
          message.channel.send(cmk)     
    }
    if (args[0] == "resimler") {
      const cmk = new Discord.MessageEmbed()
          .setDescription(` » Resimler: [tıkla](https://brobots.glitch.me/hgbbresimler.html)`)
          .setColor("BLUE")
          message.channel.send(cmk)     
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["hg-bb"],
    permLevel: 0,
    kategori: "Moderasyon" 
  };
  
  exports.help = {
    name: "hgbb",
    description: "hgbb",
    usage: "hgbb"
  };
