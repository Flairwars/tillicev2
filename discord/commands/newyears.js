const guildCfg = require('../guildCfg')
const { EmbedBuilder } = require('discord.js')

module.exports.run = async (CommandStruct, PermStruct) => {
  const msg = CommandStruct.message
  await msg.guild.roles.fetch()
  const role = msg.guild.roles.cache.find(role => role.name === 'NewYears') // need a role named newyears
  const name = msg.author.tag
  if (CommandStruct.args.length === 0) {
    msg.reply('Please include a message')
  } else if (msg.member.roles.cache.has(role.id)) {
    msg.reply('You already sent a message')
  } else {
    const embed = new EmbedBuilder()
      .setColor(msg.member.displayHexColor)
      .setAuthor({ name, iconURL: msg.member.displayAvatarURL() })
    // .setFooter(msg.member.id) // idk what the intention was here and it kept not working so I'll just leave it like this
      .setTimestamp()
      .addFields({ name: 'Message:', value: CommandStruct.args.join(' ') })
    msg.guild.channels.cache.get(guildCfg.newYearsChannelId).send({ embeds: [embed] })
    msg.member.roles.add(role)
    msg.reply("New Year's message sent")
  }
}

module.exports.helpText = 'Sends a message for New Year\'s'

module.exports.Category = 'Fun'

module.exports.RequiredPermissions = []
