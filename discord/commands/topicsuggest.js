const embeds = require('../template_embeds')

// This is a remporary file that will hold configuration for things like suggestions channels and request channels
const guildCfg = require('../guildCfg')

module.exports.run = (CommandStruct, PermStruct) => {
  if (CommandStruct.args.length === 0) {
    CommandStruct.message.channel.send({ embeds: [embeds.SendErrorEmbed('Invalid arguments', 'Please use this command in the format `topicsuggest suggestion`')] })
  } else {
    const suggestion = CommandStruct.args.join(' ')
    CommandStruct.message.guild.channels.cache.get(guildCfg.topicSuggestions)
      .send({ embeds: [embeds.topicSuggestion(CommandStruct.message.member.displayName, suggestion)] })
      .then(suggestionMessage => {
        suggestionMessage.react('👍')
        suggestionMessage.react('👎')
      })
    CommandStruct.message.channel.send('Thanks for the suggestion!')
  }
}

module.exports.helpText = 'Suggest a topic for use in the ~topic command'

module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
