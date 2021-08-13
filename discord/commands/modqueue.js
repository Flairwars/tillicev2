/** This is a test command to show what command files should look like */
const Discord = require('discord.js');
const Client = require('../init');
const perms = require('../eval_perms');
// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
  if(!CommandStruct.args[0]) return CommandStruct.message.reply("Please write your request after typing \`~modqueue\`");

  let modqueueRequest = new Discord.MessageEmbed()
  .setColor('FFFFFF')
  .setAuthor(`Request submitted by ${CommandStruct.message.author.tag}`, CommandStruct.message.author.displayAvatarURL())
  .setDescription(CommandStruct.args.join(" "))
  .setTimestamp()
  .setFooter('Request Submitted: ');

  CommandStruct.message.channel.send(modqueueRequest);
  const modQueue = CommandStruct.message.guild.channels.cache.get('744768964630020136');
  modQueue.send(modqueueRequest);

  try {
    CommandStruct.message.delete();
  } catch(err) {
    return;
  }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Used to submit a modqueue request`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Utility`

module.exports.RequiredPermissions = []
