/** This is a test command to show what command files should look like */
const Discord = require('discord.js');
const Client = require('../init');
const perms = require('../eval_perms');
// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
  if(!CommandStruct.args[0]) return CommandStruct.message.reply("You haven't specified a valid message ID");
  const modQueue = CommandStruct.message.guild.channels.cache.get('703431121857282108'); //Megaserver #modqueue ID: 703431121857282108
  let usrMsg = CommandStruct.message;
  CommandStruct.message.delete();

  modQueue.messages.fetch(CommandStruct.args[0]).then(message => {

    let newMQEmbed = new Discord.EmbedBuilder(message.embeds[0])

    .setColor('dea305')
    .setTimestamp()
    .setFooter({text: `Request Marked In Progress By ${usrMsg.author.tag}: `});

    message.edit('', {embed: newMQEmbed});
    usrMsg.channel.send("Request has been marked as in progress!").then(msg => msg.delete({timeout: 6000}));
    //const modQueue = CommandStruct.message.guild.channels.cache.get('815937228680200203');
    //modQueue.edit('', {embed: newMQEmbed});
  }).catch(err => {
    return usrMsg.channel.send("I couldn't find any messages in the modqueue channel with that message ID").then(msg => msg.delete({timeout: 6000}));
  })
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Used to mark a modqueue request as in progress`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Mod`

module.exports.RequiredPermissions = ['BotManager']
