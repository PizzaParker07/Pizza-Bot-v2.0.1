const discord = require('discord.js'); 
const ms = require('ms'); 

exports.run = async (Client, message, args, prefix) => {


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return channel.reply("Bu komutu kullanmaya gerekli iznin yok!");


    if(!args[0]) return message.channel.send(`**Çekiliş süresini belirtin.**`)
    

    if(!args[0].endsWith("s")&&!args[0].endsWith("h")&&!args[0].endsWith("d")&&!args[0].endsWith("m")) return message.channel.send(`**Çekiliş süresini belirtin.**`)

    if(isNaN(args[0][0])) return message.channel.send(`**Çekiliş süresini belirtin.**`)

    let winnerCount = args[1]

    let prize = args.slice(2).join(" ")

    if(!args[1]) return message.channel.send(`**Kaç kazanan olmasını istediğinizi belirtin.**`)
    

    if(!args[2]) return message.channel.send(`**Çekiliş ödülü olarak ne istediğinizi belirtin.**`)
    

    message.delete()

    var botEmbed = new discord.MessageEmbed()
     .setTitle("🎉 **ÇEKİLİŞ** 🎉")
     .setDescription(`
     Katılmak için 🎉 emojisine tıkla!
     **Ödül: **${prize}
     **Kazanan sayısı: **${winnerCount}
     **Çekiliş süresi: **${args[0]}
     **Çekilişi yapan: **${message.author}`)
     .setTimestamp(`Bitiş zamanı: ${Date.now()+ms(args[0])}`)
     .setColor("#d98a23")
     
 
    var msg = await message.channel.send(botEmbed)

    msg.react('🎉')

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;
    

        var peopleReacted = msg.reactions.cache.get("🎉").users.cache.array();

     
        for (let i = 0; i < peopleReacted.length; i++) {

            if(peopleReacted[i].id == Client.user.id){
                peopleReacted.splice(i,1);
                continue;
            }
        }

        if(peopleReacted.length == 0) {
            var non = new discord.MessageEmbed()
             .setColor("#ff0000")
             .setTitle("🎉 **ÇEKİLİŞ SONA ERDİ** 🎉")
             .setDescription(`Kazanan yok, çünkü kimse katılmadı!
             
              **Çekilişi yapan: **${message.author}`)
            msg.edit(non)

            return message.channel.send(`Kazanan yok, çünkü kimse katılmadı! :(\n${msg.url}`)
        }

        if(peopleReacted.length < winnerCount) {
            var non = new discord.MessageEmbed()
             .setColor("#ff0000")
             .setTitle("🎉 **ÇEKİLİŞ SONA ERDİ** 🎉")
             .setDescription(`Kazanan yok, çünkü kimse katılmadı!
             
              **ekilişi yapan: **${message.author}`)
            msg.edit(non)

            return message.channel.send(`Kazanan yok, çünkü kimse katılmadı! :(\n${msg.url}`)
        }


        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
            }


            if(!inList){
                winners.push(peopleReacted[random]);
            }
        }

        var response = ``

 
        for (let y = 0; y < winners.length; y++) {

            response += `${winners[y]}\n`
               
           
            var embed = new discord.MessageEmbed()
             .setColor("#d98a23")
             .setTitle("🎉 **ÇEKİLİŞ SONA ERDİ** 🎉")
             .setDescription(`---------------------------------
             **${prize}**
             **Kazananlar:**
             ${response}
             **Çekilişi yapan: ** ${message.author}`)
            msg.edit(embed)
    
            message.channel.send(`**Tebrikler:**\n${response} Ödlünüz... **${prize}**.\n${msg.url}`) 
        }
        
       
    }, ms(args[0]));
}

exports.conf = {
 aliases: ["çekiliş"],
 kategori: "Moderasyon" 

};

exports.help = {
  name: "çekiliş",
};  