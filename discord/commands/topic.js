const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message

    const AllowedSubs = ['askreddit', 'writingprompts', 'trueaskreddit']

    if (CommandStruct.args.length === 0) {
        msg.reply("You need to specify a subreddit")
        return
    } else if (CommandStruct.args[0].toLowerCase() === "tillice") {
        let TopicText = await helpers.getNormalTopic()
        msg.reply(embeds.SendEmbed(TopicText, `A topic from tillice`))
    } else if (! AllowedSubs.some(subreddit => args.toLowerCase() === subreddit)) {
        msg.reply('Sorry, that subreddit isn\'t allowed')
    } else {
        const subreddit = CommandStruct.args[0].toLowerCase()
        const TopicText = await helpers.getRandomRedditPost(subreddit)
        if(TopicText == undefined){
            msg.reply(embeds.SendErrorEmbed('Error', 'No topic was found'))
        } else {
            msg.reply(embeds.SendEmbed(TopicText, `A topic off of r/${subreddit}`))
        }
    }
}

module.exports.helpText = `Gets a topic from a whitelisted subreddit`

module.exports.Category = `Fun`

module.exports.RequiredPermissions = []