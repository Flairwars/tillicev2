const perms = require('../eval_perms')

const guildCfg = require('../guildCfg')
const client = require('../init')

module.exports.run = async (CommandStruct, PermStruct) => {
    
    let suggestionsChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.suggestions)
    let modPollChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.modPollChannelId)

    let suggestionMessages = await suggestionsChannel.messages.fetch({limit: 100})

    let suggestions = suggestionMessages.filter(msg => msg.author === client.Client.user)
                                        .filter(msg => msg.embeds.length > 0)
                                        .filter(msg => msg.embeds[0].author.name.startsWith('Suggestion by '))
                                        .filter(msg => !msg.embeds[0].footer.text.startsWith('Suggestion was '))
                                        .array()
    
    if (CommandStruct.args.length > 0) {
        let ExcludedSuggestions = parseInt(CommandStruct.args[0])
        suggestions.slice(ExcludedSuggestions)
    }

    suggestions.reverse()
    
    suggestions.forEach(suggestion => {
        let suggestionEmbed = suggestion.embeds[0]

        const likes = suggestion.reactions.cache.get("👍").count-1
        const dislikes = suggestion.reactions.cache.get("👎").count-1

        console.log(`Suggestion ID ${suggestion.id}: ${likes} likes and ${dislikes} dislikes`)

        
    })

}

module.exports.helpText = `Mirrors the suggestions with high enough score to the mod voting channel.`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = [perms.levels.Admin]