const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => { 
const sahip = 'Pizzacı Çocuk#3743'

message.channel.send("Benim Yapımcım: Hz baş kumandan başbakan ülkelerin lideri 10 kıtanın sahibi uzayın efendisi dünyada tek uzayda tek dünyaları siken `" + sahip + "` derim ")
}
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['yapımcı'], 
  permLevel: 0,
  kategori: "Moderasyon" 

};

exports.help = {
 name: 'sahip'
};