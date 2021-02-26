const perms = require('../eval_perms')

const guildCfg = require('../guildCfg')
const client = require('../init')
const Discord = require(`discord.js`);

module.exports.run = async (CommandStruct, PermStruct) => {
    let suggestionsChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.suggestions)
    let modPollChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.modPollChannelId)

    let modPolls = await modPollChannel.messages.fetch({limit: 100})

    let suggestions = modPolls.filter(msg => msg.author === client.Client.user) // Filter messages not made by the bot
                              .filter(msg => msg.embeds.length > 0) // Filter messages with no embeds
                              .filter(msg => msg.embeds[0].footer.text.includes('ID: ')) // No suggestions that were already accepted/denied
                              .array()
    
    suggestions.forEach( suggestion => {
        let suggestionId = suggestion.embeds[0].footer.text.split('ID: ')[1]

        let modPollEmbed = new Discord.MessageEmbed(suggestion.embeds[0])
        let newPollEmbed = new Discord.MessageEmbed(suggestion.embeds[0])

        const likes = suggestion.reactions.cache.get("👍").count-1
        const dislikes = suggestion.reactions.cache.get("👎").count-1

        if (likes > dislikes) {
            // accept
            modPollEmbed.setColor("#3ACE04")
            newPollEmbed.setColor("#3ACE04")

            modPollEmbed.setFooter(`Suggestion ${suggestionId} was accepted`);
            newPollEmbed.setFooter(`Suggestion was accepted`);
        } else {
            // deny
            modPollEmbed.setColor("#AF0303")
            newPollEmbed.setColor("#AF0303")

            modPollEmbed.setFooter(`Suggestion ${suggestionId} was rejected`)
            newPollEmbed.setFooter(`Suggestion was rejected`)
        }

        suggestionsChannel.messages.fetch(suggestionId).then(suggestionMessage => {
            suggestionMessage.edit('', {embed: newPollEmbed})
        })

        suggestion.edit('', {embed: modPollEmbed})
    })
}

module.exports.helpText = `Updates the colour of the suggestion embeds.`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = [perms.levels.Admin]