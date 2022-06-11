const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Bu komutu kullanmak için gerekli yetkiye sahip değilsin')

 
        var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
        if(!rol) return message.channel.send('Bir rol ismi veya id si girmediniz')
        db.set(`${message.guild.id}_destekrol`, rol.id)
        db.set(`${message.guild.id}_destekrolaktif`, 1)
        message.channel.send(`Destek rolü başarıyla ${rol} olarak ayarlandı.`)
   
   
   

      
    
}
exports.conf = {
    aliases: ['destek-rol'],
    kategori: "Moderasyon" 
}
exports.help = {
    name: "destek-rol"
}