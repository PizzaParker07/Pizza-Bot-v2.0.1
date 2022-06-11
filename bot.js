const Discord = require('discord.js');
const ayarlar = require('./config.json');
const fs = require('fs');
const db = require("quick.db")
const moment = require('moment');
const disbut = require("discord-buttons")
const client = new Discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
require('./util/eventLoader')(client);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.on('ready', () => {
  // Oynuyor Kısmı
  
      var actvs = [
        `${ayarlar.prefix}yardım ${client.guilds.cache.size} sunucuyu`,
        `${ayarlar.prefix}yardım ${client.users.cache.size} Kullanıcıyı`, 
        `${ayarlar.prefix}yardım`
    ];
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 15000);
    
  
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });

client.on("warn", info => console.log(info));

client.on("error", console.error)

client.commands = new Discord.Collection()
client.prefix = ayarlar.prefix
client.queue = new Map();


const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


client.login(process.env.token)

client.on('guildMemberAdd', member => {
  const mesaj = db.fetch(`dmhgmesaj_${member.guild.id}`)
  const sistem = db.fetch(`dmhgsistem_${member.guild.id}`)

  if(sistem !== 1) return console.log("sistem deaktif");

  const embed = new Discord.MessageEmbed()
  .setDescription(mesaj)
  console.log("gönderdim")
  member.send(embed)
});

client.on('roleDelete', async role => {
  const data = await require('quick.db').fetch(`carl-mute-role.${role.guild.id}`);
  if(data && data === role.id) require('quick.db').delete(`carl-mute-role.${role.guild.id}`); 
  });

  require("discord-buttons")(client)
  {
    
    const db = require("quick.db")
    const disbut = require("discord-buttons")
    client.on("clickButton", async button => {
    //------------\\
    const evet = new disbut.MessageButton()
    .setStyle("green")
    .setLabel("Evet")
    .setID("Evet");
    const hayır = new disbut.MessageButton()
    .setStyle("red")
    .setLabel("Hayır")
    .setID("Hayır");
    const geriyükle = new disbut.MessageButton()
    .setStyle("green")
    .setLabel("Geri Yükle")
    .setID("GeriYükle");
    const sil = new disbut.MessageButton()
    .setStyle("red")
    .setLabel("Desteği Kapat")
    .setID("DesteğiKapat");
    const kilit = new disbut.MessageButton()
    .setStyle("grey")
    .setLabel("Kapat")
    .setEmoji("🔒")
    .setID("Kilit");
    //------------\\
    
    //------------\\
    let member = button.guild.members.cache.get(button.clicker.user.id)
    let kanal  = button.guild.channels.cache.get(button.channel.id)
    let data   = db.fetch(`destekkullanıcı_${member.id}_${kanal.guild.id}`);
    let data2  = db.fetch(`destekkanal_${kanal.id}`);
    let user   = button.guild.members.cache.get(data2);
    
    //------------\\
    
    //------------\\
    if(button.id === "ticket"){
    if(data) return button.reply.send("> **Başarasız!** Zaten aktif destek talebiniz bulunuyor. **Kanal:** <#" + data +">", true);
    
    button.reply.think(true).then(async a => {
      if(!button.guild.channels.cache.find(c => c.name === "Destek Sistemi")){
    button.guild.channels.create('Destek Sistemi' , {type: 'category'})
      }
      setTimeout(() => {
        const csk = button.guild.channels.cache.find(c => c.name === "Destek Sistemi")
    button.guild.channels.create('destek-' + member.user.username , { type: 'text', reason: 'Destek '+ member.user.tag , parent: csk.id}).then(async c => {
    
    
    await db.set(`destekkanal_${c.id}`, member.id);
    await db.set(`destekkullanıcı_${member.id}_${kanal.guild.id}`, c.id);
    
              let role = button.guild.roles.cache.find(a => a.name === '@everyone')      
              await c.createOverwrite(role.id, {
                  SEND_MESSAGES: false,
                  VIEW_CHANNEL: false
                });
      
              await c.createOverwrite(ayarlar.adminrole, {
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true
                });
      
              await c.createOverwrite(member.id, {  
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true
                })
                const sistemrol = db.fetch(`${kanal.guild.id}_destekrol`)
    a.edit("> **Başarılı!** Destek talebiniz oluşturuldu. **Kanal:** <#" + c.id +">")
    await c.send(`${member.user}, Hoş Geldin destek ekibi sizinle ilgilenecektir. \n<@&`+sistemrol+">", kilit)
    })
      }, 2000)
    })
    } else {
    
    
    
    //------------\\




    //------------\\
    if(button.id === "Kilit"){
      button.message.edit(`> **Dikkat!** Destek talebini kapatmak istediğine emin misin?`,{
    buttons: [evet, hayır]
    })
    
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "Evet"){
    
     await kanal.createOverwrite(user, {  
                  SEND_MESSAGES: false,
                  VIEW_CHANNEL: false
                })
    
    await button.message.delete()
    await button.channel.send("> **Kapalı!** <@" + member + `> Tarafından destek talebi kapatıldı.`,{
    buttons: [geriyükle, sil]
    })
    
    await kanal.setName("kapalı-"+ user.user.username)
    
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "GeriYükle"){
      await await kanal.setName("destek-"+ user.user.username)
              await kanal.createOverwrite(user, {  
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true
                })
    
    await button.channel.send("> **Dikkat!** <@" + user + `> Destek talebi tekrar açıldı.`,{
    buttons: [kilit]
    })
    
    await button.message.delete()
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "DesteğiKapat"){
    await db.delete(`destekkanal_${kanal.id}`);
    await db.delete(`destekkullanıcı_${button.clicker.user.id}_${kanal.guild.id}`);
    
    button.channel.delete()
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "Hayır"){
    button.message.edit("<@" + user + `> Destek ekibimiz seninle ilgilenecek.\n @everyone - @here`,  kilit)
    
    button.reply.defer()
    } else {
    }}}}}
    }
    //------------\\
    
    }); 
    
    client.on("guildMemberRemove", async member => {
    
    //------------\\
    let data   = await db.get(`destekkullanıcı_${member.id}_${member.guild.id}`);
    let data2  = await db.get(`destekkanal_${data}`);
    let kanal  = member.guild.channels.cache.get(data)
    //------------\\
    
    if(!data) return;
    
    //------------\\
    await db.delete(`destekkanal_${data.id}`);
    await db.delete(`destekkullanıcı_${member.id}_${kanal.guild.id}`);
    
    kanal.delete()
    //------------\\
    
    })
    client.on("channelDelete", async channel => {
    
    //------------\\
    let data  = await db.get(`destekkanal_${channel.id}`);
    let data2   = await db.get(`destekkullanıcı_${data}_${channel.guild.id}`);
    //------------\\
    
    if(!data) return;
    
    //------------\\
    await db.delete(`destekkanal_${channel.id}`);
    await db.delete(`destekkullanıcı_${data}_${channel.guild.id}`);
    
    //------------\\
    
    })
    }
    {
      const db = require("quick.db")
      client.on("clickButton", async button => {
      
      let data = db.get(`buttonvar_${button.guild.id}_${button.id}`)
      if(!data) return;
      
      let emote = {
      başarılı: "✅"
      }
      
      let member = button.guild.members.cache.get(button.clicker.user.id)
      
      button.reply.think(true).then(async a => {
      
      if(member.roles.cache.has(data.rol)) {
       
      a.edit(`> ${emote.başarılı} **Başarılı!** Butona tıkladığın için <@&${data.rol}> Rolünü senden aldım.`)
      member.roles.remove(data.rol)
      
      } else {
      
      a.edit(`> ${emote.başarılı} **Başarılı!** Butona tıkladığın için <@&${data.rol}> Rolünü sana verdim.`)
      member.roles.add(data.rol)
      
      } 
      
      })
      
      })
      }
      client.on("guildMemberAdd", async(member) => {
        let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
        if(sunucupaneli) {
          let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
          let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
          let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
          let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
          let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
          
          if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
            db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
          }
          try{
            toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
            toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
            botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
            rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
         } catch(e) { }
        }
      })
      

 client.on("guildMemberAdd", async(member) => {
  const db = require("quick.db")
   let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
   if(sunucupaneli) {
     let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
     let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
     let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
     let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
     let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
     let songelen =  member.guild.channels.cache.find(x =>(x.name).startsWith("Son Üye • "))


     if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
       db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
     }
     try{
       toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
       toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
       botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
       rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
       songelen.setName(`Son Üye • ${member.user.username}`)
    } catch(e) { }
   }
 })
const küfür = ["abaza", "abazan", "ag", "a\u011fz\u0131na s\u0131\u00e7ay\u0131m", "ahmak", "allah", "allahs\u0131z", "am", "amar\u0131m", "ambiti", "am biti", "amc\u0131\u011f\u0131", "amc\u0131\u011f\u0131n", "amc\u0131\u011f\u0131n\u0131", "amc\u0131\u011f\u0131n\u0131z\u0131", "amc\u0131k", "amc\u0131k ho\u015faf\u0131", "amc\u0131klama", "amc\u0131kland\u0131", "amcik", "amck", "amckl", "amcklama", "amcklaryla", "amckta", "amcktan", "amcuk", "am\u0131k", "am\u0131na", "am\u0131nako", "am\u0131na koy", "am\u0131na koyar\u0131m", "am\u0131na koyay\u0131m", "am\u0131nakoyim", "am\u0131na koyyim", "am\u0131na s", "am\u0131na sikem", "am\u0131na sokam", "am\u0131n feryad\u0131", "am\u0131n\u0131", "am\u0131n\u0131 s", "am\u0131n oglu", "am\u0131no\u011flu", "am\u0131n o\u011flu", "am\u0131s\u0131na", "am\u0131s\u0131n\u0131", "amina", "amina g", "amina k", "aminako", "aminakoyarim", "amina koyarim", "amina koyay\u0131m", "amina koyayim", "aminakoyim", "aminda", "amindan", "amindayken", "amini", "aminiyarraaniskiim", "aminoglu", "amin oglu", "amiyum", "amk", "amkafa", "amk \u00e7ocu\u011fu", "amlarnzn", "aml\u0131", "amm", "ammak", "ammna", "amn", "amna", "amnda", "amndaki", "amngtn", "amnn", "amona", "amq", "ams\u0131z", "amsiz", "amsz", "amteri", "amugaa", "amu\u011fa", "amuna", "ana", "anaaann", "anal", "analarn", "anam", "anamla", "anan", "anana", "anandan", "anan\u0131", "anan\u0131", "anan\u0131n", "anan\u0131n am", "anan\u0131n am\u0131", "anan\u0131n d\u00f6l\u00fc", "anan\u0131nki", "anan\u0131sikerim", "anan\u0131 sikerim", "anan\u0131sikeyim", "anan\u0131 sikeyim", "anan\u0131z\u0131n", "anan\u0131z\u0131n am", "anani", "ananin", "ananisikerim", "anani sikerim", "ananisikeyim", "anani sikeyim", "anann", "ananz", "anas", "anas\u0131n\u0131", "anas\u0131n\u0131n am", "anas\u0131 orospu", "anasi", "anasinin", "anay", "anayin", "angut", "anneni", "annenin", "annesiz", "anuna", "aptal", "aq", "a.q", "a.q.", "aq.", "ass", "atkafas\u0131", "atm\u0131k", "att\u0131rd\u0131\u011f\u0131m", "attrrm", "auzlu", "avrat", "ayklarmalrmsikerim", "azd\u0131m", "azd\u0131r", "azd\u0131r\u0131c\u0131", "babaannesi ka\u015far", "baban\u0131", "baban\u0131n", "babani", "babas\u0131 pezevenk", "baca\u011f\u0131na s\u0131\u00e7ay\u0131m", "bac\u0131na", "bac\u0131n\u0131", "bac\u0131n\u0131n", "bacini", "bacn", "bacndan", "bacy", "bastard", "basur", "beyinsiz", "b\u0131z\u0131r", "bitch", "biting", "bok", "boka", "bokbok", "bok\u00e7a", "bokhu", "bokkkumu", "boklar", "boktan", "boku", "bokubokuna", "bokum", "bombok", "boner", "bosalmak", "bo\u015falmak", "cenabet", "cibiliyetsiz", "cibilliyetini", "cibilliyetsiz", "cif", "cikar", "cim", "\u00e7\u00fck", "dalaks\u0131z", "dallama", "daltassak", "dalyarak", "dalyarrak", "dangalak", "dassagi", "diktim", "dildo", "dingil", "dingilini", "dinsiz", "dkerim", "domal", "domalan", "domald\u0131", "domald\u0131n", "domal\u0131k", "domal\u0131yor", "domalmak", "domalm\u0131\u015f", "domals\u0131n", "domalt", "domaltarak", "domalt\u0131p", "domalt\u0131r", "domalt\u0131r\u0131m", "domaltip", "domaltmak", "d\u00f6l\u00fc", "d\u00f6nek", "d\u00fcd\u00fck", "eben", "ebeni", "ebenin", "ebeninki", "ebleh", "ecdad\u0131n\u0131", "ecdadini", "embesil", "emi", "fahise", "fahi\u015fe", "feri\u015ftah", "ferre", "fuck", "fucker", "fuckin", "fucking", "gavad", "gavat", "geber", "geberik", "gebermek", "gebermi\u015f", "gebertir", "ger\u0131zekal\u0131", "gerizekal\u0131", "gerizekali", "gerzek", "giberim", "giberler", "gibis", "gibi\u015f", "gibmek", "gibtiler", "goddamn", "godo\u015f", "godumun", "gotelek", "gotlalesi", "gotlu", "gotten", "gotundeki", "gotunden", "gotune", "gotunu", "gotveren", "goyiim", "goyum", "goyuyim", "goyyim", "g\u00f6t", "g\u00f6t deli\u011fi", "g\u00f6telek", "g\u00f6t herif", "g\u00f6tlalesi", "g\u00f6tlek", "g\u00f6to\u011flan\u0131", "g\u00f6t o\u011flan\u0131", "g\u00f6to\u015f", "g\u00f6tten", "g\u00f6t\u00fc", "g\u00f6t\u00fcn", "g\u00f6t\u00fcne", "g\u00f6t\u00fcnekoyim", "g\u00f6t\u00fcne koyim", "g\u00f6t\u00fcn\u00fc", "g\u00f6tveren", "g\u00f6t veren", "g\u00f6t verir", "gtelek", "gtn", "gtnde", "gtnden", "gtne", "gtten", "gtveren", "hasiktir", "hassikome", "hassiktir", "has siktir", "hassittir", "haysiyetsiz", "hayvan herif", "ho\u015faf\u0131", "h\u00f6d\u00fck", "hsktr", "huur", "\u0131bnel\u0131k", "ibina", "ibine", "ibinenin", "ibne", "ibnedir", "ibneleri", "ibnelik", "ibnelri", "ibneni", "ibnenin", "ibnerator", "ibnesi", "idiot", "idiyot", "imansz", "ipne", "iserim", "i\u015ferim", "ito\u011flu it", "kafam girsin", "kafas\u0131z", "kafasiz", "kahpe", "kahpenin", "kahpenin feryad\u0131", "kaka", "kaltak", "kanc\u0131k", "kancik", "kappe", "karhane", "ka\u015far", "kavat", "kavatn", "kaypak", "kayyum", "kerane", "kerhane", "kerhanelerde", "kevase", "keva\u015fe", "kevvase", "koca g\u00f6t", "kodu\u011fmun", "kodu\u011fmunun", "kodumun", "kodumunun", "koduumun", "koyarm", "koyay\u0131m", "koyiim", "koyiiym", "koyim", "koyum", "koyyim", "krar", "kukudaym", "laciye boyad\u0131m", "lavuk", "libo\u015f", "madafaka", "mal", "malafat", "malak", "manyak", "mcik", "meme", "memelerini", "mezveleli", "minaamc\u0131k", "mincikliyim", "mna", "monakkoluyum", "motherfucker", "mudik", "oc", "ocuu", "ocuun", "O\u00c7", "o\u00e7", "o. \u00e7ocu\u011fu", "o\u011flan", "o\u011flanc\u0131", "o\u011flu it", "orosbucocuu", "orospu", "orospucocugu", "orospu cocugu", "orospu \u00e7oc", "orospu\u00e7ocu\u011fu", "orospu \u00e7ocu\u011fu", "orospu \u00e7ocu\u011fudur", "orospu \u00e7ocuklar\u0131", "orospudur", "orospular", "orospunun", "orospunun evlad\u0131", "orospuydu", "orospuyuz", "orostoban", "orostopol", "orrospu", "oruspu", "oruspu\u00e7ocu\u011fu", "oruspu \u00e7ocu\u011fu", "osbir", "ossurduum", "ossurmak", "ossuruk", "osur", "osurduu", "osuruk", "osururum", "otuzbir", "\u00f6k\u00fcz", "\u00f6\u015fex", "patlak zar", "penis", "pezevek", "pezeven", "pezeveng", "pezevengi", "pezevengin evlad\u0131", "pezevenk", "pezo", "pic", "pici", "picler", "pi\u00e7", "pi\u00e7in o\u011flu", "pi\u00e7 kurusu", "pi\u00e7ler", "pipi", "pipi\u015f", "pisliktir", "porno", "pussy", "pu\u015ft", "pu\u015fttur", "rahminde", "revizyonist", "s1kerim", "s1kerm", "s1krm", "sakso", "saksofon", "salaak", "salak", "saxo", "sekis", "serefsiz", "sevgi koyar\u0131m", "sevi\u015felim", "sexs", "s\u0131\u00e7ar\u0131m", "s\u0131\u00e7t\u0131\u011f\u0131m", "s\u0131ecem", "sicarsin", "sie", "sik", "sikdi", "sikdi\u011fim", "sike", "sikecem", "sikem", "siken", "sikenin", "siker", "sikerim", "sikerler", "sikersin", "sikertir", "sikertmek", "sikesen", "sikesicenin", "sikey", "sikeydim", "sikeyim", "sikeym", "siki", "sikicem", "sikici", "sikien", "sikienler", "sikiiim", "sikiiimmm", "sikiim", "sikiir", "sikiirken", "sikik", "sikil", "sikildiini", "sikilesice", "sikilmi", "sikilmie", "sikilmis", "sikilmi\u015f", "sikilsin", "sikim", "sikimde", "sikimden", "sikime", "sikimi", "sikimiin", "sikimin", "sikimle", "sikimsonik", "sikimtrak", "sikin", "sikinde", "sikinden", "sikine", "sikini", "sikip", "sikis", "sikisek", "sikisen", "sikish", "sikismis", "siki\u015f", "siki\u015fen", "siki\u015fme", "sikitiin", "sikiyim", "sikiym", "sikiyorum", "sikkim", "sikko", "sikleri", "sikleriii", "sikli", "sikm", "sikmek", "sikmem", "sikmiler", "sikmisligim", "siksem", "sikseydin", "sikseyidin", "siksin", "siksinbaya", "siksinler", "siksiz", "siksok", "siksz", "sikt", "sikti", "siktigimin", "siktigiminin", "sikti\u011fim", "sikti\u011fimin", "sikti\u011fiminin", "siktii", "siktiim", "siktiimin", "siktiiminin", "siktiler", "siktim", "siktim", "siktimin", "siktiminin", "siktir", "siktir et", "siktirgit", "siktir git", "siktirir", "siktiririm", "siktiriyor", "siktir lan", "siktirolgit", "siktir ol git", "sittimin", "sittir", "skcem", "skecem", "skem", "sker", "skerim", "skerm", "skeyim", "skiim", "skik", "skim", "skime", "skmek", "sksin", "sksn", "sksz", "sktiimin", "sktrr", "skyim", "slaleni", "sokam", "sokar\u0131m", "sokarim", "sokarm", "sokarmkoduumun", "sokay\u0131m", "sokaym", "sokiim", "soktu\u011fumunun", "sokuk", "sokum", "soku\u015f", "sokuyum", "soxum", "sulaleni", "s\u00fclaleni", "s\u00fclalenizi", "s\u00fcrt\u00fck", "\u015ferefsiz", "\u015f\u0131ll\u0131k", "taaklarn", "taaklarna", "tarrakimin", "tasak", "tassak", "ta\u015fak", "ta\u015f\u015fak", "tipini s.k", "tipinizi s.keyim", "tiyniyat", "toplarm", "topsun", "toto\u015f", "vajina", "vajinan\u0131", "veled", "veledizina", "veled i zina", "verdiimin", "weled", "weledizina", "whore", "xikeyim", "yaaraaa", "yalama", "yalar\u0131m", "yalarun", "yaraaam", "yarak", "yaraks\u0131z", "yaraktr", "yaram", "yaraminbasi", "yaramn", "yararmorospunun", "yarra", "yarraaaa", "yarraak", "yarraam", "yarraam\u0131", "yarragi", "yarragimi", "yarragina", "yarragindan", "yarragm", "yarra\u011f", "yarra\u011f\u0131m", "yarra\u011f\u0131m\u0131", "yarraimin", "yarrak", "yarram", "yarramin", "yarraminba\u015f\u0131", "yarramn", "yarran", "yarrana", "yarrrak", "yavak", "yav\u015f", "yav\u015fak", "yav\u015fakt\u0131r", "yavu\u015fak", "y\u0131l\u0131\u015f\u0131k", "yilisik", "yogurtlayam", "yo\u011furtlayam", "yrrak", "z\u0131kk\u0131m\u0131m", "zibidi", "zigsin", "zikeyim", "zikiiim", "zikiim", "zikik", "zikim", "ziksiiin", "ziksiin", "zulliyetini", "zviyetini","şak şak","ağla","ağlıyorsun","ağlıyon","boş yapma","s1k","yarrraaa","bane","cu","napim","g0tten","kökten girsin","a31ndan","@n@n","@nneni s1l>eyim","@r@spu evladı","annesi var olmayan","baba sütü","0r0spu","evladı","annesi pis kadın"];
const reklam = ["www", "www.", ".com" ,".net",".gg","discord.gg",".xyz", ".io",".co",".org","gov.tr"]
 client.on("message", async (message)=>{
  let reklamdb = db.get(`reklam_${message.guild.id}`)
  if(!reklamdb) return;
  let kufurdb = db.fetch(`küfür.${message.guild.id}.durum`)
  if(!kufurdb) return;
  if(küfür.some(word => message.content.includes(word))||reklam.some(word => message.content.includes(word))){
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    message.delete();
    if(!db.get("küfür-limit"+message.member.id)) return db.set("küfür-limit"+message.member.id, 1)
    let limit = db.get("küfür-limit"+message.member.id);
    var muterole;
    if(limit<3)
    {
      db.add("küfür-limit"+message.member.id,1)
      return;
    }else {
      var role;
      if(message.guild.roles.cache.find(role=>role.name === "mute")) 
      {
        muterole = message.guild.roles.cache.find(role=>role.name === "mute");
      }else {
        muterole = message.guild.roles.create({
          data: {
            name: "mute",
          },
          reason: "mute rolü olmadığı için açıldı"
        })
         message.guild.channels.cache.forEach(async (c)=>{
          c.createOverwrite((await muterole).id,{
            "SEND_MESSAGES": false,
            "ADD_REACTIONS": false,
            "MANAGE_MESSAGES": false,
            "CONNECT": false
          })
        })
      }
      setTimeout(() => {
        role = message.guild.roles.cache.find(role=>role.name === "mute");
       message.member.roles.add(role.id);
      }, 5000);
      message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("<@"+message.member+"> adlı kişi küfür/reklam limiti açtığı için cezalandırıldı.\n10 dakika sonra cezası kaldırılacak.").setTimestamp())
      return setTimeout(() => {
        db.delete("küfür-limit"+message.member.id)
        message.member.roles.remove(role.id)
      }, 60000);
    }
  }
 })
 client.on("messageUpdate", async (old, neww) => {
  let reklamdb = db.get(`reklam_${neww.guild.id}`)
  if(!reklamdb) return;
  let kufurdb = db.fetch(`küfür.${neww.guild.id}.durum`)
  if(!kufurdb) return;
  if(küfür.some(word => neww.content.includes(word)) || reklam.some(word => neww.content.includes(word))){
    if(neww.member.hasPermission("ADMINISTRATOR")) return;
    neww.delete();
    if(!db.get("küfür-limit"+neww.member.id)) return db.set("küfür-limit"+neww.member.id, 1)
    let limit = db.get("küfür-limit"+neww.member.id);
    var muterole;
    if(limit<3)
    {
      db.add("küfür-limit"+neww.member.id,1)
      return;
    }else {
      if(neww.guild.roles.cache.find(role=>role.name === "mute")) 
      {
        muterole = neww.guild.roles.cache.find(role=>role.name === "mute");
      }else {
        muterole = neww.guild.roles.create({
          data: {
            name: "mute",
          },
          reason: "mute rolü olmadığı için açıldı"
        })
        neww.guild.channels.cache.forEach(async (c)=>{
          c.createOverwrite((await muterole).id,{
            "SEND_MESSAGES": false,
            "ADD_REACTIONS": false,
            "MANAGE_MESSAGES": false,
            "CONNECT": false
          })
        })
      }
      await neww.member.roles.add(muterole.id);
      neww.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("<@"+neww.member+"> adlı kişi küfür/reklam limiti açtığı için cezalandırıldı.\n10 dakika sonra cezası kaldırılacak.").setTimestamp())
      return setTimeout(() => {
        db.delete("küfür-limit"+neww.member.id);
        neww.member.roles.remove(muterole.id);

      }, 60000);
    }
  }
})
const botadi = "Kira"

client.on('guildBanAdd', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir kişi sunucudan yasaklandı")
    .setThumbnail(user.avatarURL()||user.defaultAvatarURL)
    .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('guildBanRemove', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
   const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
   if(!modlogs) return;
   if(modlogs) {
     let embed = new Discord.MessageEmbed()
     .setColor("#fffa00")
     .setAuthor("Bir kişinin yasağı kaldırıldı")
     .setThumbnail(user.avatarURL()||user.defaultAvatarURL)
     .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
     .setFooter(`${botadi} | Mod-Log Sistemi`)
     .setTimestamp()
     modlogkanal.send(embed)
   }
 });


 client.on('channelCreate', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
   const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
   if(!modlogs) return;
   if(modlogs) {
     if (channel.type === "text") {
       let embed = new Discord.MessageEmbed()
       .setColor("#fffa00")
       .setAuthor("Bir Kanal Oluşturuldu")
       .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
       .addField(`Oluşturulan Kanalın Türü : `, `Yazı`)
       .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
       .setFooter(`${botadi} | Mod-Log Sistemi`)
       .setTimestamp()
       modlogkanal.send(embed)
     }
       if (channel.type === "voice") {
       
         let embed = new Discord.MessageEmbed()
         .setColor("#fffa00")
         .setAuthor("Bir Kanal Oluşturuldu")
         .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
         .addField(`Oluşturulan Kanalın Türü : `, `Ses`)
         .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
         .setFooter(`${botadi} | Mod-Log Sistemi`)
         .setTimestamp()
         modlogkanal.send(embed)
 
 
     }
 }});

 client.on('channelDelete', async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
let user = client.users.cache.get(entry.executor.id)
let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
if(!modlogs) return;
if(modlogs) {
if (channel.type === "text") {
let embed = new Discord.MessageEmbed()
.setColor("#fffa00")
.setAuthor("Bir Kanal Silindi")
.addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
.addField(`Silinen Kanalın Türü : `, `Yazı`)
.addField(`Kanalı Silen : `, `<@${user.id}>`)
.setFooter(`${botadi} | Mod-Log Sistemi`)
.setTimestamp()
modlogkanal.send(embed)
}
  if (channel.type === "voice") {

    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Kanal Silindi")
    .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
    .addField(`Silinen Kanalın Türü : `, `Ses`)
    .addField(`Kanalı Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
   }
  }
});

client.on('roleDelete', async role => {
  let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
   let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
   let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
   if(!modlogs) return;
   if(modlogs) {
     let embed = new Discord.MessageEmbed()
     .setColor("#fffa00")
     .setAuthor("Bir Rol Silindi")
     .addField(`Silinen Rolün İsmi : `, `${role.name}`)
     .addField(`Rolü Silen : `, `<@${user.id}>`)
     .setFooter(`${botadi} | Mod-Log Sistemi`)
     .setTimestamp()
     modlogkanal.send(embed)
   }
 });
 
 client.on('emojiDelete', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
  let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
   const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
   if(!modlogs) return;
   if(modlogs) {
     let embed = new Discord.MessageEmbed()
     .setColor("#fffa00")
     .setAuthor("Bir Emoji Silindi")
     .addField(`Silinen Emojinin İsmi : `, `${emoji.name}`)
     .addField(`Emojiyi Silen : `, `<@${user.id}>`)
     .setFooter(`${botadi} | Mod-Log Sistemi`)
     .setTimestamp()
     modlogkanal.send(embed)
   }
 });
  

 client.on('roleCreate', async role => {
  let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
    const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
    if(!modlogs) return;
    if(modlogs) {
      let embed = new Discord.MessageEmbed()
      .setColor("#fffa00")
      .setAuthor("Bir Rol Oluşturuldu")
      .addField(`Oluşturulan Rolün İsmi : `, `${role.name}`)
      .addField(`Rolü Oluşturan : `, `<@${user.id}>`)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp()
      modlogkanal.send(embed)
    }
  });
  
  
  client.on('emojiCreate', async emoji => {
   let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
   let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
   let user = client.users.cache.get(entry.executor.id)
    const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
    if(!modlogs) return;
    if(modlogs) {
      let embed = new Discord.MessageEmbed()
      .setColor("#fffa00")
      .setAuthor("Bir Emoji Oluşturuldu")
      .addField(`Oluşturulan Emojinin İsmi : `, `${emoji.name}`)
      .addField(`Emoji Silen : `, `<@${user.id}>`)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp()
      modlogkanal.send(embed)
    }
  });

//MESAJ LOG
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  if (newMessage.content.startsWith(ayarlar.prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${newMessage.guild.id}`);
  let scbul = newMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", "```" + oldMessage.content + "```")
    .addField("Yeni Mesaj", "```" + newMessage.content + "```")
    .addField("Kanal Adı", newMessage.channel.name)
    .addField("Mesaj ID", newMessage.id)
    .addField("Kullanıcı ID", newMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(ayarlar.prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${deletedMessage.guild.id}`);
  let scbul = deletedMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL())
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", "```" + deletedMessage.content + "```")
    .addField("Kanal Adı", deletedMessage.channel.name)
    .addField("Mesaj ID", deletedMessage.id)
    .addField("Kullanıcı ID", deletedMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours() +
        3}:${deletedMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'p!ip') {  //BUNU YAZINCA ALTTAKİ MESAJ GİDİCEK
    msg.reply('client.connect  213.238.166.139:10000'); //YUKARIDAKİNİ YAZINCA BU CEVABI VERİCEK
  }
});







client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/Wrn1XW.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));

  if (!canvaskanal || canvaskanal ===  undefined) return;
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/UyVZ4f.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  if(db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`)
    member.roles.add(rolID)
  } else {
    return;
  }
  if(db.has(`${member.guild.id}_otokanal`)) {
    var kanall = client.channels.cache.get(db.fetch(`${member.guild.id}_otokanal`))
    const embed = new Discord.MessageEmbed()
    .setDescription(`Yeni katılan ${member} kullanıcısına <@&${rolID}> rolü verildi.`)
    .setTimestamp()
    kanall.send(embed)
  } else {
    return;
  }
})

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});

////////// jail 

client.on('guildMemberAdd', async (member) => {
  let jail = await db.fetch(`jail_${member.id}_${member.guild.id}`);
  let jailkanal = await db.fetch(`jail_${member.guild.id}`);
  if(!jail) return;
  member.guild.channels.cache.forEach(async (channel, id) => {
      await channel.createOverwrite(member, {
    VIEW_CHANNEL: false,
    SEND_MESSAGES: false
  })})
      await member.guild.channels.cache.get(jailkanal).createOverwrite(member, {
    VIEW_CHANNEL: true,
    SEND_MESSAGES: true
  })
})

