module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    if (CommandStruct.args.length === 0) {
        msg.channel.send('Please include a channel category')
        return
    }
    const modCategoryID = `463799764178305055` // moderator fun category to exclude
    const CategoryName = CommandStruct.args.join(' ')
    const Category = msg.guild.channels.cache
            .filter(channel => channel.parent)
            .map(channel => channel.parent)
            .filter(Category => Category.id !== modCategoryID)
            .find(Category => Category.name.toLowerCase().includes(CategoryName.toLowerCase()))
    if (!Category) {
        msg.channel.send(`Invalid category name`)
        return
    }
    await msg.channel.send(`**${Category.name}**`)
    const channels = new Map([...Category.children.cache].sort((a, b) => a[1].name.localeCompare(b[1].name)))
    for (var [channelID, channel] of channels) {
        const NewMessage = await msg.channel.send(`Archive/unarchive ${channel}?`)
        await NewMessage.react("👍")   // thumbsup
        await NewMessage.react("👎")   // thumbsdown
        await NewMessage.react("🤷")   // shrug
    }
}

module.exports.helpText = `Creates archival/unarchival polls for each channel in a category`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = ["Admin", "BotManager"]
