const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = "p!";

module.exports.run = async (client, message, args) => {
let db = require('quick.db')
let botisim = message.guild.members.cache.get(client.user.id).displayName
let data = await db.fetch(`jailrol_${message.guild.id}`)
if(!data)  return message.channel.send(`Jail rolünü bulamadım.`)
let data3 = await db.fetch(`modlogkanaly_${message.guild.id}`)
if(!data3)  return message.channel.send(`Jail kanalını bulamadım.`)
let rol = message.guild.roles.cache.get(data)
if(!rol) return message.channel.send(`Jail rolü ayarlı değil.`)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`Jail log kanalı ayarlı değil.`)

if(!message.member.hasPermission("MANAGE_MESSAGES")) return channel.reply("Bu komutu kullanmaya gerekli iznin yok!");
  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(`Kimi susturacaksın? Etiketlemeyi unutma.`)
  if(kişi.hasPermission("MANAGE_GUILD")) return message.channel.send(`Olmaz. Bu kişiyi susturamam.`)
  
  let zaman = args[1]
  if(!args[1]) return message.channel.send(`Ne kadar süre jailde duracağını belirtmelisin.\nÖrnek: p!jail kişi süre sebep`)

let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
  
  const wasted = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL())
  .setColor(`#f3c7e1`)
  .setDescription(`Al işte! Yine biri hapishaneye yollandı.`)
  .addField(`**Hapishaneye yollanan kişi:**`, kişi, true)
  .addField(`**Hakim:**`, `<@${message.author.id}>`, true)
  .addField(`**Sebep:**`, sebep, true)
  .addField(`**Süre:**`, zaman.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat'), true)
  .setTimestamp()
  .setFooter(`${message.channel.name} kanalında kullanıldı.`)
  .setThumbnail(message.author.avatarURL())
  
  const bitti = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL())
  .setDescription(`Birisi tahliye oldu!`)
  .addField(`**Tahliye olan:**`, kişi, true)
  .addField(`**Hakim:**`, `<@${message.author.id}>`, true)
  .setTimestamp()
  .setColor(`#f3c7e1`)
  .setFooter(`Jail süresi bitti. | ${message.channel.name} kanalında kullanıldı.`)
  .setThumbnail(message.author.avatarURL())
  


    let useroles = kişi.roles.cache.map(r => r.id)
   

db.set(`kişiroler_${message.guild.id}_${kişi.id}`, useroles)
const aa = db.fetch(`kişiroler_${message.guild.id}_${kişi.id}`)


kişi.roles.set([`${rol.id}`]);


    
    kanal.send(wasted)
    message.channel.send(`${kişi} isimli kişi başarıyla hapishaneye gönderildi.`)
    setTimeout(async () =>{
        
    kişi.roles.remove(rol.id)
   
    kanal.send(bitti)
    
        const i = await db.fetch(`kişiroler_${message.guild.id}_${kişi.id}` )
        
        if(i){kişi.roles.add(i)}
        kişi.roles.remove(rol.id)

        
        db.delete(`kişiroler_${message.guild.id}_${kişi.id}`)
        
                  db.delete(`kişiroler_${message.guild.id}_${kişi.id}`)
  }, ms(zaman));
          
}

exports.conf = {
    aliases: ['jail'],
    permLevel: 0,
    kategori: "Moderasyon",
  };
  
  exports.help = {
    name: 'jail',
    description: 'jail',
    usage: 'jail',
   
  };
  