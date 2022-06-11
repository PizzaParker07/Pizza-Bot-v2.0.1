const Discord = require('discord.js');
  const db = require("quick.db")
  const disbut = require("discord-buttons");
  exports.run = async (client, message, args) => {

    const sistem = db.fetch(`${message.guild.id}_destekrolaktif`)
    if(sistem !== 1) return message.channel.send(`Lütfen öncelikle p!destek-role yazarak destek yetkili rolünü belirleyin!`)

const buton = new disbut.MessageButton()
.setStyle("blurple")
.setEmoji("📨")
.setID("ticket")

message.channel.send("Destek Talebi Oluşturmak İçin Butona Tıkla! ", buton)

  }

  exports.conf = {
    aliases: ["ticket"],
    kategori: "Moderasyon" 

   }

  exports.help = {
    name: 'ticket'
   }