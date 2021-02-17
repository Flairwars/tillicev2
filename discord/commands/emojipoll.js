module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    var EmojiList = msg.guild.emojis.cache.map(e => e.toString());
    var emo2 = `${EmojiList}`;
    var EmojiArray = emo2.split(",");
    await msg.channel.send(`**Vote whether to keep or remove the following Emojis:**`);
    EmojiArray.forEach(async emote => {
        const NewMessage = await msg.channel.send(emote);
        await NewMessage.react("👍");   // thumbsup
        await NewMessage.react("👎");   // thumbsdown
        await NewMessage.react("🤷");   // shrug
    })
}

module.exports.helpText = `Creates archival polls for each emoji`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = ["Admin", "BotManager"]
