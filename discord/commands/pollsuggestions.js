const perms = require('../eval_perms')

const guildCfg = require('../guildCfg')
const client = require('../init')

const Discord = require(`discord.js`);

module.exports.run = async (CommandStruct, PermStruct) => {
    
    let suggestionsChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.suggestions)
    let modPollChannel = CommandStruct.message.guild.channels.cache.get(guildCfg.modPollChannelId)

    let suggestionMessages = await suggestionsChannel.messages.fetch({limit: 100})

    let suggestions = suggestionMessages.filter(msg => msg.author === client.Client.user) // Filter messages not made by the bot
                                        .filter(msg => msg.embeds.length > 0) // Filter messages with no embeds
                                        .filter(msg => msg.embeds[0].author.name.startsWith('Suggestion by ')) // Only suggestions please
                                        .filter(msg => !msg.embeds[0].footer.text.startsWith('Suggestion was ')) // No suggestions that were already accepted/denied
                                        .filter(msg => !msg.embeds[0].footer.text.startsWith('Suggestion is being ')) // No suggestions already being polled
                                        .array()
    
    if (CommandStruct.args.length > 0) {
        let ExcludedSuggestions = parseInt(CommandStruct.args[0])
        suggestions.slice(ExcludedSuggestions)
    }

    suggestions.reverse()
    
    suggestions.forEach(suggestion => {
        let suggestionEmbed = suggestion.embeds[0]

        let acceptedSuggestions = 0

        let embed = new Discord.MessageEmbed(suggestionEmbed)

        const likes = suggestion.reactions.cache.get("👍").count-1
        const dislikes = suggestion.reactions.cache.get("👎").count-1

        if (likes < 1) { // Actual threshold is 15
            // Suggestion denied

            embed.setAuthor(suggestionEmbed.author.name, suggestionEmbed.author.iconURL)
                .setColor('#FF0000')
                .setFooter(`Suggestion was rejected`);

        } else {
            // Send poll to modpollchannel
            acceptedSuggestions += 1;

            embed.setAuthor(`${acceptedSuggestions}: ${suggestionEmbed.author.name}`)
                 .setColor('#FFFF00')
                 .setFooter(`${likes} 👍, ${dislikes} 👎 | ID: ${suggestion.id}`)
            
            modPollChannel.send(embed).then( msg => {
                msg.react("👍");
                msg.react("👎");
                msg.react("🤷");
            })

            embed.setAuthor(suggestionEmbed.author.name, suggestionEmbed.author.iconURL)
                 .setFooter(`Suggestion is being polled in mod channels.`);
        }

        suggestion.edit('', {embed: embed})
    })

}

module.exports.helpText = `Mirrors the suggestions with high enough score to the mod voting channel.`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = [perms.levels.Admin]