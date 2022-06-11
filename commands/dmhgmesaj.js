const Discord = require('discord.js');
const ayarlar = require('../config.json')
const db = require("quick.db")
exports.run = async (client, message, args) => {

    if(!args[0]) return message.channel.send("Lütfen yapmak istediğiniz işlemi seçin. (ayarla,sıfırla)")
    if(args[0] === "ayarla") {
        let mesaj = args.slice(1).join(' ');
        if(!args[1]) return message.channel.send("Lütfen hoşgeldin mesajınızı belirleyin!")

        db.set(`dmhgmesaj_${message.guild.id}`, mesaj)
        db.set(`dmhgsistem_${message.guild.id}`, 1)
    message.channel.send("Mesaj başarıyla ayarlandı!")
    }else if(args[0] === "sıfırla") {
        const dat = db.fetch(`dmhgmesaj_${message.guild.id}`)
        if(!dat) return message.channel.send("Sistem zatan ayarlanmamış!")

        message.channel.send("Sistem başarıyla sıfırlandı!")
        db.delete(`dmhgmesaj_${message.guild.id}`)
        db.delete(`dmhgsistem_${message.guild.id}`)
    }

    

    

};

exports.conf = {
  aliases: ['dm-hg'],
  permLevel: 0,
  kategori: 'Moderasyon'
};

exports.help = {
  name: 'dm-hg',
  description: 'dm-hg',
  usage: 'dm-hg',

};
