module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    await msg.reply("Shutting down. You can configure me to automatically restart elsewhere.")
    process.exit(1)
}

module.exports.helpText = `Shuts down the bot`

module.exports.Category = `Dev`

module.exports.RequiredPermissions = ["BotManager"]
