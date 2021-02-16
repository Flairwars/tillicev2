const client = require('../init');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    if (CommandStruct.args.length < 2) {
        msg.reply("Must specify channel and message")
        return
    }
    const Message = CommandStruct.args.slice(1).join(' ')
    const Channel = msg.mentions.channels.first()["id"]
    console.log(Channel)
    client.Client.channels.cache.get(Channel).send(Message)
    await msg.react('✅')
}

module.exports.helpText = `Sends a message into another channel`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = ["Admin", "BotManager"]
