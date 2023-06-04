const r = require('../../reddit/init')
const embeds = require('../template_embeds')

module.exports.run = (CommandStruct, PermStruct) => {
    // TODO: First try the API to see if they're registered
    if (CommandStruct.args.length == 0) {
        CommandStruct.message.channel.send('Please enter a reddit username after the command')
    }
    else {
        r.getUser(CommandStruct.args[0]).fetch().then( thisUser => {
            if (thisUser) {
                let dateCreated = new Date(thisUser.created_utc*1000)
                let totalKarma = thisUser.total_karma
                let commentKarma = thisUser.comment_karma
                let linkKarma = thisUser.link_karma
                let awarderKarma = thisUser.awarder_karma
                let awardeeKarma = thisUser.awardee_karma
                let username = `/u/${thisUser.name}`

                r.getSubreddit('flairwars').getUserFlair(thisUser.name).then( userFlair => {

                    CommandStruct.message.channel.send({
                        embeds: [
                        embeds.redditInfoEmbed(
                            userFlair.flair_css_class.toLowerCase(),
                            username,
                            dateCreated.toDateString(),
                            totalKarma,
                            linkKarma,
                            commentKarma,
                            awarderKarma,
                            awardeeKarma
                        )]
                        })
                })
            }
            else {
                CommandStruct.message.channel.send(`I couldn't find the user ${CommandStruct.args[0]}, try again`)
            }
        }).catch( err => {
            CommandStruct.message.channel.send(`I couldn't find the user ${CommandStruct.args[0]}, try again`)
        })
    }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `See a user's reddit information`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Utility`

module.exports.RequiredPermissions = []
