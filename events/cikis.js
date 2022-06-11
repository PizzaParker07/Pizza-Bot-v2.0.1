const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');

module.exports = async member => {  
  if (!`gcc_${member.guild.id}`) return;
   var randomMsg = [
                    "Güle Güle Üstad.",
                    "Tekrar Görüşmek Üzere.",
                    "Gidişin Bizi Üzdü."
                    ];
    var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]
  
  let paket = await db.fetch(`pakets_${member.id}`)
  let memberChannel = await db.fetch(`gcc_${member.guild.id}`)
  let msj = await db.fetch(`cikisM_${member.guild.id}`)
  if (!msj) msj = `{uye}, ${randomMsg_integer}`
  
  
  const canvas = Canvas.createCanvas(360, 250);
    const ctx = canvas.getContext('2d');
  
  let resim = await db.fetch(`gcc_resim_${member.guild.id}`)
  if (!resim) var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701784924377710652/dere.png"
  if (resim == "minecraft-1") var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701784929616265216/mcc.png"
  if (resim == "minecraft-2") var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701784880056631396/mcs.png"
  if (resim == "istanbul") var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701784918031859792/ist.png"
  const background = await Canvas.loadImage(resssim);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = `#ffffff`;
    ctx.font = `15px "S&S Nickson One"`;
    ctx.textAlign = "center";
  ctx.fillText(`${member.user.username.toUpperCase()}`, 170, 215);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) || member.user.defaultAvatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"; //const userimg = await Jimp.read(member.user.displayAvatarURL);
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
  
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill()
  ctx.lineWidth = 4;
      ctx.arc(118 + 62, 62 + 62, 62, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 118, 62, 124, 124);
  
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'baybay.png');
  member.guild.channels.cache.get(memberChannel).send(attachment)
  member.guild.channels.cache.get(memberChannel).send(msj.replace('{uye}', member).replace('{sunucu}', member.guild.name));
  if (member.user.bot) return member.guild.channels.cache.get(memberChannel).send(`🤖 Bu bir bot, ${member.user.tag}`)
  
}