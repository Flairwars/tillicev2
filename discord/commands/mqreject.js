/** This is a test command to show what command files should look like */
const { EmbedBuilder } = require('discord.js')
const guildCfg = require('../guildCfg')

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = async (CommandStruct, PermStruct) => {
  if (!CommandStruct.args[0]) return CommandStruct.message.reply("You haven't specified a valid message ID")
  const modQueue = await CommandStruct.message.guild.channels.fetch(guildCfg.modQueueChannelId) // Megaserver #modqueue ID: 703431121857282108
  const usrMsg = CommandStruct.message
  CommandStruct.message.delete()

  modQueue.messages.fetch(CommandStruct.args[0]).then(message => {
    const newMQEmbed = new EmbedBuilder(message.embeds[0])
      .setColor('da1313')
      .setTimestamp()
      .setFooter({ text: `Request Rejected By ${usrMsg.author.tag}: ` })

    message.edit({ embeds: [newMQEmbed] })
    usrMsg.channel.send('Request has been rejected! You may now delete the modqueue logging from the `#modqueue-requests` channel').then(msg => msg.delete({ timeout: 6000 }))
    // const modQueue = CommandStruct.message.guild.channels.cache.get('815937228680200203');
    // modQueue.edit('', {embed: newMQEmbed});
  }).catch(err => {
    console.error(err)
    return usrMsg.channel.send("I couldn't find any messages in the modqueue channel with that message ID").then(msg => msg.delete({ timeout: 6000 }))
  })
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = 'Used to mark a modqueue request as rejected'

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = 'Mod'

module.exports.RequiredPermissions = ['BotManager']
