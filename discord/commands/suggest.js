const embeds = require('../template_embeds')

// This is a remporary file that will hold configuration for things like suggestions channels and request channels
const guildCfg = require('../guildCfg')

module.exports.run = (CommandStruct, PermStruct) => {

    if (CommandStruct.args.length == 0) {
        CommandStruct.message.channel.send(embeds.SendErrorEmbed('Invalid arguments', 'Please type use this command in the format `suggest suggestion`'))
    }
    else {
        const suggestion = CommandStruct.args.join(' ')
        CommandStruct.message.channel.send(embeds.SkeletonEmbed()).then( DiscussionMessage => {
            CommandStruct.message.guild.channels.cache.get(guildCfg.suggestions).send(
                embeds.suggestionVotingEmbed(
                    CommandStruct.message.member.displayName,
                    CommandStruct.message.author.avatarURL,
                    suggestion,
                    DiscussionMessage.url
                )
            ).then( SuggestionVotingMessage => {
                SuggestionVotingMessage.react("👍")
                SuggestionVotingMessage.react("👎")

                DiscussionMessage.edit(
                    embeds.suggestionDiscussionEmbed(
                        CommandStruct.message.member.displayName,
                        CommandStruct.message.author.avatarURL,
                        suggestion,
                        SuggestionVotingMessage.url
                    )
                )
            })
        })
    }
}

module.exports.helpText = `Suggest something about the megaserver`

module.exports.Category = `Utility`

module.exports.RequiredPermissions = []