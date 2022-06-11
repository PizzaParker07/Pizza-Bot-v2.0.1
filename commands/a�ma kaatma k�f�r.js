exports.run = (client, message) => {
    let db = require("quick.db")
    let Discord = require("discord.js")

    let küfür = db.fetch(`küfür.${message.guild.id}.durum`)
    const member3 = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`**HATA** - Bu Sunucuda Yetkili Değilsin.`)
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
    if (küfür) {
        db.delete(`küfür.${message.guild.id}`)
        message.channel.send(new Discord.MessageEmbed().setColor("RED").addField("**Durum:**","Küfür koruma kapatıldı").addField("İşlem Yapan:",message.author.username).setTimestamp().addField("**Sonuç:**","Başarılı"))
    } else {
        db.set(`küfür.${message.guild.id}.durum`, true)
        message.channel.send(new Discord.MessageEmbed().setColor("BLUE").addField("**Durum:**","Küfür koruma açıldı").addField("İşlem Yapan:",message.author.username).setTimestamp().addField("**Sonuç:**","Başarılı"))
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["küfürengel"],
    permLevel: 0,
    kategori: "Moderasyon" 
};

exports.help = {
    name: 'küfürengel',
    description: 'küfrü engel ab',
    usage: 'küfürengel'
}