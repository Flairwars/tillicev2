/** This is a test command to show what command files should look like */
const Discord = require('discord.js')
const guildCfg = require('../guildCfg')
// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
  if (!CommandStruct.args[0]) return CommandStruct.message.reply('Please write your request after typing `~modqueue`')

  const modqueueRequest = new Discord.EmbedBuilder()
    .setColor('FFFFFF')
    .setAuthor({ name: `Request submitted by ${CommandStruct.message.author.tag}`, iconURL: CommandStruct.message.author.displayAvatarURL() })
    .setDescription(CommandStruct.args.join(' '))
    .setTimestamp()
    .setFooter({ text: 'Request Submitted: ' })

  CommandStruct.message.channel.send({ embeds: [modqueueRequest] })
  const modQueue = CommandStruct.message.guild.channels.cache.get(guildCfg.modQueueChannelId)
  modQueue.send({ embeds: [modqueueRequest] })

  try {
    CommandStruct.message.delete()
  } catch (err) {

  }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = 'Used to submit a modqueue request'

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
