const { EmbedBuilder } = require('discord.js')

module.exports.run = async (CommandStruct, PermStruct) => {
  const msg = CommandStruct.message
  const guild = msg.guild
  // Cache the Members
  await guild.members.fetch()
  const date = guild.createdAt
  const embed = new EmbedBuilder()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setFooter({ text: `ID: ${guild.id} | Server created: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` }) // Month +1 because of course it is zero-indexed
    .addFields([
      { name: 'Owner', value: await guild.members.fetch(guild.ownerID), inline: true },
      { name: 'Region', value: guild.region, inline: true },
      { name: 'Categories', value: guild.channels.cache.filter(channel => channel.type === 'category').size, inline: true },
      { name: 'Text channels', value: guild.channels.cache.filter(channel => channel.type === 'text').size, inline: true },
      { name: 'Voice channels', value: guild.channels.cache.filter(channel => channel.type === 'voice').size, inline: true },
      { name: 'Members', value: guild.memberCount, inline: true },
      { name: 'Humans', value: guild.members.cache.filter(member => !member.user.bot).size, inline: true },
      { name: 'Bots', value: guild.members.cache.filter(member => member.user.bot).size, inline: true },
      // {name: "Online", value: guild.members.cache.filter(member => member.presence.status === 'online').size, inline: true}, // Disabled simply because I cannot be bothered to touch intents again.
      { name: 'Roles', value: guild.roles.cache.size, inline: true },
      {
        name: 'Moderators',
        value: Array.from(guild.members.cache
          .filter(member => member.permissions.has('Administrator')) // Filter mods
          .values()) // Convert the map values to an array
          .join('\n')
      } // Join the array values by a newline to print them out nicely
    ])
  msg.reply({ embeds: [embed] })
}

module.exports.helpText = 'Gets information about the server'

module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
