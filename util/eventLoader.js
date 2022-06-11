const emirhansarac = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('message', emirhansarac('message'));
  client.on('guildMemberAdd', emirhansarac('giris'));
  client.on('guildMemberRemove', emirhansarac('cikis'));
};
