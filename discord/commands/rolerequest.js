const embeds = require('../template_embeds')

// This is a remporary file that will hold configuration for things like suggestions channels and request channels
const guildCfg = require('../guildCfg')

module.exports.run = (CommandStruct, PermStruct) => {
  if (CommandStruct.args.length === 0) {
    CommandStruct.message.channel.send({ embeds: [embeds.SendErrorEmbed('Invalid arguments', 'Please use this command in the format `rolerequest newRoles`')] })
  } else {
    const requestedRole = CommandStruct.args.join(' ')
    CommandStruct.message.guild.channels.cache.get(guildCfg.roleRequestChannel).send({ embeds: [embeds.RequestEmbed(`<@${CommandStruct.message.member.id}>`, 'role', requestedRole)] })
    CommandStruct.message.channel.send('Request logged. Thanks!')
  }
}

module.exports.helpText = 'Request a modular role'

module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
