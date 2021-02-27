const embeds = require('../template_embeds')
const helpers = require('../helpers.js')

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    const QDBChannelID = '466292953959104512' // for main server 466292953959104512
    const QDBChannel = msg.guild.channels.cache.get(QDBChannelID)
    const Quotes = await QDBChannel.messages.fetch({ limit: 100 })
    const QuotesArray = Array.from(Quotes.values())
    while (true) {
        const RandomQuote = helpers.getRandomEntry(QuotesArray);
        if (RandomQuote.attachments.size > 0) {
            const ImageURL = RandomQuote.attachments.values().next().value.url;
            await msg.reply(embeds.SendImageEmbed(ImageURL, `Posted by @${RandomQuote.author.tag}`))
            break
        }
    }
}

module.exports.helpText = `Gets a random quote from #quote-database`

module.exports.Category = `Fun`

module.exports.RequiredPermissions = []