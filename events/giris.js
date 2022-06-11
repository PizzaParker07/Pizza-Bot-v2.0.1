const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');
const Jimp = require('jimp')

module.exports = async member => {
  if (!`gcc_${member.guild.id}`) return;
    var randomMsg = [
                    "Sunucuya Hoşgeldin Kardeşim.",
                    "Gelişin Bizi Şereflendirdi.",
                    "Seni Burada Görmek Ne Güzel!"
                    ];
    var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]

  let msj = await db.fetch(`girisM_${member.guild.id}`)
  if (!msj) msj = `{uye}, ${randomMsg_integer}`
  let memberChannel = await db.fetch(`gcc_${member.guild.id}`)
  
  const canvas = Canvas.createCanvas(360, 250);
  const ctx = canvas.getContext('2d');
  
  let resim = await db.fetch(`gcc_resim_${member.guild.id}`)
  if (!resim) var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701785926606520321/dere2.png"
  if (resim == "minecraft-1") var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701785874093834350/mcc2.png"
  if (resim == "minecraft-2") var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701785919136595988/mcs2.png"
  if (resim == "istanbul") var resssim = "https://cdn.discordapp.com/attachments/689492274966429805/701785925650219009/ist2.png"
  const background = await Canvas.loadImage(resssim);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = `#ffffff`;
  ctx.font = `15px "S&S Nickson One"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username.toUpperCase()}`, 170, 215);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }) || member.user.defaultAvatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"; //const userimg = await Jimp.read(member.user.displayAvatarURL);
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
  
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill()
  ctx.lineWidth = 4;
  ctx.arc(118 + 62, 62 + 62, 62, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 118, 62, 124, 124);
    /*/ctx.arc(24 + 30, 56 + 56, 22, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 24, 30, 112, 112);
  /*/
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Hoşgeldin.png');
  member.guild.channels.cache.get(memberChannel).send(attachment)
  member.guild.channels.cache.get(memberChannel).send(msj.replace('{uye}', member).replace('{sunucu}', member.guild.name))
  if (member.user.bot) return member.guild.channels.cache.get(memberChannel).send(`🤖 Bu bir bot, ${member.user.tag}`)
  
}