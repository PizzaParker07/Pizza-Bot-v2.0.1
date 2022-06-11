const Discord = require('discord.js');
const ayarlar = require('../config.json')
const db = require("quick.db")
exports.run = async (bot, message, args) => {

    const ayarli = db.fetch(`jailayar_${message.guild.id}`)
    

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olman gerekli.")

    message.guild.roles.create({
        data: {
          name: 'Jail',
          color: 'RED',
        },
        reason: 'Hapishane rolü',
      }).then(rol => {
        let role = message.guild.roles.cache.find(role => role.name === "Jail");
        db.set(`jailrol_${message.guild.id}`, role.id)
      })

    message.guild.channels.create('Jail', { type: 'category', reason: 'Jail Alanı!' }).then(kategor => {
        let every = message.guild.roles.cache.find(r => r.name === '@everyone')
        let role = message.guild.roles.cache.find(role => role.name === "Jail");

        kategor.createOverwrite(every, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
          })
          kategor.createOverwrite(role, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false
          })
         
        message.guild.channels.create("jail-sohbet", "text").then(sohbet => {
        message.guild.channels.create('jail-log', "text").then(medya => {
            db.set(`jailkanal_${message.guild.id}`, medya.id)
            message.guild.channels.create("Jail Ses", { type: 'voice'}).then(ses => {
          sohbet.setParent(kategor.id)
          medya.setParent(kategor.id)
          ses.setParent(kategor.id)
    })
    })
    })
    })

    db.set(`jailayar_${message.guild.id}`, 1)
    message.channel.send("Jail sistemi başarıyla kuruldu!")

};

exports.conf = {
  aliases: ['jail-kur'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'jailkur',
  description: 'jailkur',
  usage: 'jailkur',
 
};
