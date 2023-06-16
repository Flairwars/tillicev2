/** This is a test command to show what command files should look like */

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = async (CommandStruct, PermStruct) => {
  await CommandStruct.message.guild.roles.fetch()
  await CommandStruct.message.guild.members.fetch()

  const totemBots = CommandStruct.message.guild.roles.cache
    .find(role => role.name === 'Totem')
    .members.filter(member => member.user.bot)

  const colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']

  // Turqoise header
  let colourString = '```yaml\nCurrent state of the totems\n```'

  colours.forEach(colour => {
    // For each colour, get the totem bots of this colour
    const colourTotems = totemBots.filter(member => member.roles.cache.find(role => role.name === colour))
    // Either create a list of mentions from the totems of this colour, or there are no totems and print "none" instead
    const totemString = colourTotems.size > 0
      ? colourTotems.map(member => (`<@${member.id}>`)).join('\n')
      : 'none'
    colourString = `${colourString}**${colour} totems:**\n${totemString}\n`
  })
  CommandStruct.message.channel.send(colourString)

  // Delete the trigger message
  CommandStruct.message.delete().catch(console.error)
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = 'Displays the list of totems and who owns them'

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
