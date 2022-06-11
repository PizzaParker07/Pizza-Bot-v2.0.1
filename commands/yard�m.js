const Discord = require('discord.js')
const ayarlar = require('../config.json') 
const {MessageButton, MessageActionRow} = require("discord-buttons");
var btn1 = new MessageButton().setEmoji("😉");
var btn2 = new MessageButton().setEmoji("🎵");
var btn3 = new MessageButton().setEmoji("⚔️");
var btn4 = new MessageButton().setEmoji("😀");
var btn5 = new MessageButton().setEmoji("💻");
const button = new MessageActionRow().addComponents(
  btn1.setStyle("blurple").setID("genel").setLabel("Genel"),
  btn2.setStyle("blurple").setID("muzik").setLabel("Müzik"),
  btn3.setStyle("blurple").setID("moderasyon").setLabel("Moderasyon"),
  btn4.setStyle("blurple").setID("eglence").setLabel("Eğlence"),
  btn5.setStyle("blurple").setID("sunucu").setLabel("Sunucu"),
);
exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
  .setAuthor('Yardım Komutları', message.author.displayAvatarURL())
  .setThumbnail(client.user.avatarURL())
  .setColor('#FFFB05')
  .setDescription(`**Aşağıda bulunan butonlardan  herhangi birine tıklayarak istediğiniz menüye erişebilirsiniz.**`)
  .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
  message.channel.send(embed,button).then(msg =>{

    client.on("clickButton", async button => {
    if(button.id === "moderasyon"){
      let Moderasyon = new Discord.MessageEmbed()
      .setAuthor('Moderasyon', message.author.displayAvatarURL())
      .setColor('#2667FF')
      .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
      .setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'Moderasyon').map(cmd => `:white_small_square: - **${ayarlar.prefix}${cmd.help.name}** ${cmd.help.description}`).join("\n "))
      return button.reply.send(Moderasyon, true)
    }
    if(button.id === "genel"){
      let Genel = new Discord.MessageEmbed()
      .setAuthor('Genel', message.author.avatarURL())
      .setColor('#2667FF')
      .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
      .setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'Genel').map(cmd => `:white_small_square: - **${ayarlar.prefix}${cmd.help.name}** ${cmd.help.description}`).join("\n "))
      return button.reply.send(Genel, true)
    }
    if(button.id === "muzik"){
      return button.reply.send(new Discord.MessageEmbed()
      .setAuthor('Muzik', message.author.displayAvatarURL())
     .setColor('#2667FF')
     .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
     .setDescription(
      `
      \`${ayarlar.prefix}oynat <şarkı-adı>\` : **Bir Şarkıyı Oynatır.**
      \`${ayarlar.prefix}atla\` : **Sıradaki Şarkıyı atlar.**
      \`${ayarlar.prefix}döngü\` : **O Anki şarkıyı Hep tekrarlar.**
      \`${ayarlar.prefix}durdur\` : **O anki Şarkıyı Durdurur.**
      \`${ayarlar.prefix}devam\` : **Duran Şarkıyı Devam Ettirir.**
      \`${ayarlar.prefix}sıra\` : **O Anki Sırayı Gösterir.**
      \`${ayarlar.prefix}np\` : **O Anki Oynatılan Şarkıyı Söyler.**
      `),  true)
    }
    if(button.id === "eglence"){
      let Eğlence = new Discord.MessageEmbed()
      .setAuthor('Eğlence', message.author.displayAvatarURL())
      .setColor('#2667FF')
      .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
      .setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'Eğlence').map(cmd => `:white_small_square: - **${ayarlar.prefix}${cmd.help.name}** ${cmd.help.description}`).join("\n "))
      return button.reply.send(Eğlence, true)
    }
    if(button.id === "sunucu"){
      let Sunucu = new Discord.MessageEmbed()
      .setAuthor('Sunucu', message.author.displayAvatarURL())
      .setColor('#2667FF')
      .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
      .setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'Sunucu').map(cmd => `:white_small_square: - **${ayarlar.prefix}${cmd.help.name}** ${cmd.help.description}`).join("\n "))
      return button.reply.send(Sunucu, true)
    }
  })
})
  }

    

  exports.conf = {
    aliases: ['help', 'cmds', 'komutlar','y'], //Komutun farklı yazılışlarla kullanımları
    permLevel: 0, //Komutun kimler kullanacağını belirtir (bot.js dosyasından en aşağı inerseniz gerekli yeri görürsünüz)

  };

  exports.help = {
    name: 'yardım',  //adını belirtin (kullanmak için gereken komut) Örneğin Otorol
    description: 'Komutlar hakkında bilgi verir.', //Komutun açıklaması
    usage: 'yardım', //Komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
  };