const Discord = require("discord.js");
const db = require("quick.db")
const disbut = require("discord-buttons");

exports.run = async(client, message, args) => {

const prefix = "?"

let emote = {
başarılı: "✅",
başarısız: "❌"
}

let komut = args[0]
let komut1 = args[1]
let komut2 = args.slice(2).join(" ")
let komut3 = args[3]
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]); 
let sayıX = db.get(`buttonrol_${message.guild.id}`) || "0"
let data = db.get(`buttonrol_${message.guild.id}`)
let mesaj = db.get(`buttonmesaj_${message.guild.id}`)
let exp = db.get(`buttonvar_${message.guild.id}_${komut1}`)

if(komut === "ekle") {

if(!rol) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen rol belirtin! **Örnek:** `"+ prefix +"emojirol ekle @rol Kayıt Olmak İçin Tıkla!`")

if(!komut2) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen butonun üzerinde yazıcak yazıyı belirtin! **Örnek:** `"+ prefix +"emojirol ekle @rol Kayıt Olmak İçin Tıkla`")

if(sayıX.length >= 25) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** En fazla 25 tane button role ekliyebilirsin!")

if(komut2.length >= 79) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Butonun üzerinde yazıcak sayı en fazla 80 harf olmadılır!")

db.add(`emojirolsayı_${message.guild.id}`, 1)

let sayı = db.get(`emojirolsayı_${message.guild.id}`)

db.push(`buttonrol_${message.guild.id}`, {
id: `${sayı}`,
rol: rol.id,
yazı: komut2
})

db.set(`buttonvar_${message.guild.id}_${sayı}`, {
rol: rol.id,
yazı: komut2,
id: sayı
})

let embed = new Discord.MessageEmbed()
.setTitle(emote.başarılı + " Başarılı!")
.setDescription(`Button ID: \`${sayı}\`, Rol: ${rol}, Yazı: \`${komut2}\``)
.setColor("AQUA")

message.channel.send(embed)
}

if(komut == "kaldır") {

if(isNaN(komut1)) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Silmek istediğiniz seçeneğin ID'sini belirtin!`)

if(!exp) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Sistemde bu ID'ye sahip menü seçeneği yok! **Seçenek Listesi** \`${prefix}emojirol liste\``)

db.delete(`buttonvar_${message.guild.id}_${komut1}`)

db.unpush(`buttonrol_${message.guild.id}`, {id: `${komut1}`})

message.channel.send(`> ${emote.başarılı} **Başarılı!** **${komut1}** ID'li button emoji rol silindi!`)
}

if(komut == "liste") {

if(!data) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Sistemde gösterilcek button emoji rol yok! **Eklemek İçin:** \`${prefix}emojirol ekle @rol Button Yazısı\``)

let expert = 1
let ls = []

data
.sort((a, b) => a.id - b.id)
.map(veri => ls.push(`\`${expert++}.\` ID: **${veri.id}** Rol: <@&${veri.rol}> Button Yazısı: **${veri.yazı}**`)).join("\n")

let embed = new Discord.MessageEmbed()
.setTitle("Mute Menü Seçenekleri")
.setDescription(ls)
.setColor("RANDOM")


message.channel.send(embed)
}

if(komut == "mesaj") {
if(komut1 == "değiştir") {

if(mesaj) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Zaten button gönderme mesajı ayarlanmış! **Sıfırlamak İçin:** `"+ prefix +"emojirol mesaj sıfırla`")

if(!komut2) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen butonları gönderirken üstünde yazıcak mesajı belirtin! **Örnek:** `"+ prefix +"emojirol mesaj değiştir @Rol'ünü almak için butona tıkla!`")

if(komut2.length >= 2000 && komut2.length <= 5) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Botton gönderme mesajı MAX 2000 harf MIN 5 harf olmalıdır!! **Örnek:** `"+ prefix +"emojirol mesaj değiştir @Rol'ünü almak için butona tıkla!`")

let sexpert = new Discord.MessageEmbed()
.setTitle(`${emote.başarılı} Başarılı!`)
.setDescription(`Buttonları gönderirken üstünde yazıcak mesaj ayarlandı.`)
.addField("Mesaj ↷", "```" + komut2 + "```")
.setColor("RANDOM")

message.channel.send(sexpert)

db.set(`buttonmesaj_${message.guild.id}`, komut2)

return;
}

if(komut1 == "sıfırla") {

if(!mesaj) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Zaten button gönderme mesajı ayarlanmamış! **Ayarlamak İçin:** `"+ prefix +"emojirol mesaj değiştir @Rol'ünü almak için butona tıkla!`")

db.delete(`buttonmesaj_${message.guild.id}`)

message.channel.send(`> ${emote.başarılı} **Başarılı!** Button mesaj sıfırlandı! **Ayarlamak İçin:** \``+ prefix +`emojirol mesaj değiştir @Rol'ünü almak için butona tıkla!\``)

return;
}


if(!data) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Sistemde mesaj gönderilcek button emoji rol yok! **Eklemek İçin:** \`${prefix}emojirol ekle @rol Button Yazısı\``)

if(!mesaj) mesaj = "Rol Almak İçin Tıkla!"

if(data.length <= 5) {

let ls = []

data
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

        let group = new disbut.MessageActionRow().addComponents(ls);

message.channel.send(mesaj, {
components: [group]
})
}

if(data.length >= 5 && data.length <= 10) {

let ls = []
let ls1 = []

data
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))


        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);

message.channel.send(mesaj, {
components: [group, group1]
})
}

if(data.length >= 10 && data.length <= 15) {

let ls = []
let ls1 = []
let ls2 = []

data
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);

message.channel.send(mesaj, {
components: [group, group1, group2]
})
}

if(data.length >= 15 && data.length <= 20) {

let ls = []
let ls1 = []
let ls2 = []
let ls3 = []

data
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(15, 20)
.map(veri => ls3.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);
        let group3 = new disbut.MessageActionRow().addComponents(ls3);

message.channel.send(mesaj, {
components: [group, group1, group2, group3]
})
}

if(data.length >= 20 && data.length <= 25) {

let ls = []
let ls1 = []
let ls2 = []
let ls3 = []
let ls4 = []

data
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(15, 20)
.map(veri => ls3.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

data
.sort((a, b) => a.id - b.id)
.slice(20, 25)
.map(veri => ls4.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))


        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);
        let group3 = new disbut.MessageActionRow().addComponents(ls3);
        let group4 = new disbut.MessageActionRow().addComponents(ls4);

message.channel.send(mesaj, {
components: [group, group1, group2, group3, group4]
})
}
}

if(komut !== "ekle" && komut !== "kaldır" && komut !== "liste" && komut !== "mesaj") {

let uyarı = new Discord.MessageEmbed()
.setTitle(emote.başarısız + " Başarısız!")
.setDescription("> Komutu kullanmak için argüman belirtin!")
.addField("Emoji Rol Eklemek/Kaldırmak", "```" + 
`
${prefix}emojirol ekle @rol Button Yazısı
${prefix}emojirol kaldır <Button ID>
${prefix}emojirol liste
`
 
+ "```")
.addField("Buttonları Göndermek", "```" + 
`
${prefix}emojirol mesaj
${prefix}emojirol mesaj değiştir <mesaj>
${prefix}emojirol mesaj sıfırla
` 

+ "```")
.setColor("RANDOM")


message.channel.send(uyarı)
}

};

exports.conf = {
 aliases: ["emoji-rol"],
 kategori: "Moderasyon" 

};

exports.help = {
  name: "emojirol",
};  