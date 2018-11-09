const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

function NumberToEmoji(_numbers) {
   _numbers = _numbers.toString();
   var text = ``, numbers = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 0: 'zero' };

   for(let i =0; i < _numbers.length; i++) text += ':' + numbers[parseInt(_numbers[i])] + ':';

  return text;
}

client.on("ready", async () => {
  console.log(`Bot has started in ${client.guilds.size} guilds.`);
  client.user.setActivity(`The Emoji Movie`, { type: "WATCHING" });
  client.channels.get("510536319311675432").setTopic(`The main place for chatting.‍ ‍ ‍ ‍ ‍Total members: ${NumberToEmoji(client.guilds.get("305598859986599938").memberCount)}`)
});

client.on("message", async message => {
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
});

client.on("guildMemberAdd", async member => {
  member.guild.channels.get("510536319311675432").setTopic(`The main place for chatting.‍ ‍ ‍ ‍ ‍Total members: ${NumberToEmoji(member.guild.memberCount)}`)
});

client.on("guildMemberRemove", async member => {
  member.guild.channels.get("510536319311675432").setTopic(`The main place for chatting.‍ ‍  ‍ ‍‍Total members: ${NumberToEmoji(member.guild.memberCount)}`)
});

client.on("voiceStateUpdate", (oldMember, newMember, member) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    member.addRole("510591770158039050");
  } else if(newUserChannel === undefined){
    member.removeRole("510591770158039050");
  }
});


client.login(process.env.BOT_TOKEN);
