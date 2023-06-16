const embeds = require('../template_embeds')

// This is a remporary file that will hold configuration for things like suggestions channels and request channels
const guildCfg = require('../guildCfg')

module.exports.run = (CommandStruct, PermStruct) => {
  if (CommandStruct.args.length === 0) {
    CommandStruct.message.channel.send(embeds.SendErrorEmbed('Invalid arguments', 'Please use this command in the format `namerequest newName`'))
  } else {
    const requestedName = CommandStruct.args.join(' ')
    CommandStruct.message.guild.channels.cache.get(guildCfg.nameRequestChannel).send(embeds.RequestEmbed(`<@${CommandStruct.message.member.id}>`, 'name', requestedName))
    CommandStruct.message.channel.send('Request logged. Thanks!')
  }
}

module.exports.helpText = 'Request a name for an upcoming holiday'

module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
