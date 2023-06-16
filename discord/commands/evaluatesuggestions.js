const perms = require('../eval_perms')

const guildCfg = require('../guildCfg')
const client = require('../init')
const { EmbedBuilder } = require('discord.js')

module.exports.run = async (CommandStruct, PermStruct) => {
  const suggestionsChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.suggestions)
  const modPollChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.modPollChannelId)

  const modPolls = await modPollChannel.messages.fetch({ limit: 100 })

  const suggestions = modPolls.filter(msg => msg.author === client.Client.user) // Filter messages not made by the bot
    .filter(msg => msg.embeds.length > 0) // Filter messages with no embeds
    .filter(msg => msg.embeds[0].footer.text.includes('ID: ')) // No suggestions that were already accepted/denied

  suggestions.forEach(suggestion => {
    if (suggestion.embeds === undefined) {
      console.log('what')
      return
    }
    const suggestionId = suggestion.embeds[0].footer.text.split('ID: ')[1]

    const modPollEmbed = new EmbedBuilder(suggestion.embeds[0])
    const newPollEmbed = new EmbedBuilder(suggestion.embeds[0])

    const likes = suggestion.reactions.cache.get('👍').count
    const dislikes = suggestion.reactions.cache.get('👎').count

    if (likes > dislikes) {
      // accept
      modPollEmbed.setColor('#3ACE04')
      newPollEmbed.setColor('#3ACE04')

      modPollEmbed.setFooter({ text: `Suggestion ${suggestionId} was accepted` })
      newPollEmbed.setFooter({ text: 'Suggestion was accepted' })
    } else {
      // deny
      modPollEmbed.setColor('#AF0303')
      newPollEmbed.setColor('#AF0303')

      modPollEmbed.setFooter({ text: `Suggestion ${suggestionId} was rejected` })
      newPollEmbed.setFooter({ text: 'Suggestion was rejected' })
    }

    suggestionsChannel.messages.fetch(suggestionId).then(suggestionMessage => {
      suggestionMessage.edit({ embeds: [newPollEmbed] })
    })

    suggestion.edit({ embeds: [modPollEmbed] })
  })
}

module.exports.helpText = 'Updates the colour of the suggestion embeds.'

module.exports.Category = 'Mod'

module.exports.RequiredPermissions = [perms.levels.Admin]
