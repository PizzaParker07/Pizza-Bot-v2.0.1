const Discord = require("discord.js");
exports.run = async function(client, message, args) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      const botunmesajyonet = new Discord.MessageEmbed()
        .setColor(0x1e90ff)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField(
          ":warning: WARNING :warning:",
          "Mesaj Silebilmek İçin Meşajları Yönet Yetkisine Sahip Olmalısın"
        );
      return message.author.send(botunmesajyonet);
    }

    let messagecount = parseInt(args.join(" "));
    if (!messagecount)
      return message.reply("Kaç Mesaj Sileyim");
    message.channel.messages
      .fetch({
        limit: messagecount
      })
      .then(messages => message.channel.bulkDelete(messages))
      .catch(err => {
        return message.reply("14 Gün Önce Atılan Mesajları Silemem");
      });

    const sohbetsilindi = new Discord.MessageEmbed()
      .setColor(0x1e90ff)
      .setTimestamp()
      .addField("Durum:", "Sohbet Temizlendi")
      .addField("Sahip:", "`" + message.author.tag + "`")
      .addField("Sonuç:", `Başarılı`);
    return message.reply(sohbetsilindi).then(msg => {
      msg.delete({ timeout: 20000 /*time unitl delete in milliseconds*/});
  });
  
};
exports.conf = {
  aliases: [
    "sil",
    "deletemessage",
    "messagedelete",
    "message-delete",
    "delete-message",
    "delete",
    "delete-msg",
    "sik"
  ],
  kategori: "Moderasyon" 

};
exports.help = {
  name: 'Sil',
  description: 'Belirtilen Adetde Mesaj Sil',
  usage: 'p!sil <adet>'
}