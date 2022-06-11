
const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısın!"
    );

  let panel = await db.fetch(`sunucupanel_${message.guild.id}`);

  let rekoronline = await db.fetch(`panelrekor_${message.guild.id}`);
  if (args[0] === "sil" || args[0] === "kapat") {
    db.delete(`sunucupanel_${message.guild.id}`);
    db.delete(`panelrekor_${message.guild.id}`);
    try {
      message.guild.channels.cache
        .find(x => x.name.includes(" • Sunucu Panel"))
        .delete();
      message.guild.channels.cache
        .find(x => x.name.includes("Toplam Üye •"))
        .delete();
      message.guild.channels.cache
        .find(x => x.name.includes("Aktif Üye •"))
        .delete();
      message.guild.channels.cache
        .find(x => x.name.includes("Botlar •"))
        .delete();
      message.guild.channels.cache
        .find(x => x.name.includes("Rekor Aktiflik •"))
        .delete();
      message.guild.channels.cache
        .find(x => x.name.includes("Son Üye •"))
        .delete();
      message.guild.channels.cache
        .find(x => x.name.includes("Çevrimiçi Üye •"))
        .delete();
    } catch (e) {}
    message.channel.send(
      `Ayarlanan sunucu paneli başarıyla devre dışı bırakıldı!`
    );
    return;
  }

  if (panel)
    return message.channel.send(
      `Bu sunucuda panel zaten ayarlanmış! Devredışı bırakmak için;  \`!sunucupanel sil\``
    );

  message.channel
    .send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Sunucu Panel")
        .setDescription("Gerekli dosaylar kurulsun mu?.")
        .setFooter('Onaylıyorsan 15 saniye içerisinde "evet" yazmalısın.')
    )
    .then(() => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 15000,
          errors: ["time"]
        })
        .then(collected => {
          db.set(`sunucupanel_${message.guild.id}`, message.guild.id);
          try {
            let role = message.guild.roles.cache.find(
              n => n.name === "@everyone"
            );
            message.guild.channels.create(
              `${client.user.username} • Sunucu Panel`,
              { type: "category" },
              [{ id: message.guild.id, deny: ["CONNECT"] }]
            );
            message.guild.channels
              .create(`Toplam Üye • ${message.guild.members.cache.size}`, { type: "voice"})
              .then(channel =>
                channel.setParent(
                  message.guild.channels.cache.find(
                    channel =>
                      channel.name === `${client.user.username} • Sunucu Panel`
                  )
                )
              )
              .then(c => {
                c.createOverwrite(role, {
                  CONNECT: false
                });
              });

            message.guild.channels
              .create(
                `Aktif Üye • ${
                  message.guild.members.cache.filter(
                    off => off.presence.status !== "offline"
                  ).size
                }`,
                { type: "voice" }
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.cache.find(
                    channel =>
                      channel.name === `${client.user.username} • Sunucu Panel`
                  )
                )
              )
              .then(c => {
                c.createOverwrite(role, {
                  CONNECT: false
                });
              });

            message.guild.channels
              .create(
                `Botlar • ${
                  message.guild.members.cache.filter(m => m.user.bot).size
                }`,
                { type: "voice" }
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.cache.find(
                    channel =>
                      channel.name === `${client.user.username} • Sunucu Panel`
                  )
                )
              )
              .then(c => {
                c.createOverwrite(role, {
                  CONNECT: false
                });
              });

            message.guild.channels
              .create(
                `Rekor Aktiflik • ${
                  message.guild.members.cache.filter(
                    off => off.presence.status !== "offline"
                  ).size
                }`,
                { type: "voice" }
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.cache.find(
                    channel =>
                      channel.name === `${client.user.username} • Sunucu Panel`
                  )
                )
              )
              .then(c => {
                c.createOverwrite(role, {
                  CONNECT: false
                });
              });
            message.guild.channels
              .create(
                `Son Üye • ${
                  message.guild.members.cache.filter(
                    member => member.user.username !== "offline"
                  ).size
                }`,
                { type: "voice" }
              )
              .then(channel =>
                channel.setParent(
                  message.guild.channels.cache.find(
                    channel =>
                      channel.name === `${client.user.username} • Sunucu Panel`
                  )
                )
              )
              .then(c => {
                c.createOverwrite(role, {
                  CONNECT: false
                });
              });
            db.set(
              `panelrekor_${message.guild.id}`,
              message.guild.members.cache.filter(
                off => off.presence.status !== "offline"
              ).size
            );

            message.channel.send(
              `Sunucu panel için gerekli kanallar oluşturulup, ayarlamalar yapıldı!  \`(Oda isimlerini değiştirmeyin, çalışmaz!)\``
            );
          } catch (e) {
            console.log(e.stack);
          }
        });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucu-panel", "panel"],
  kategori: "Moderasyon" 

};

exports.help = {
  name: "sunucu-panel"
};