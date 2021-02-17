module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    Perms = []
    if (PermStruct.Administrator) {
        Perms.push("Administrator")
    }
    if (PermStruct.BotManager) {
        Perms.push("BotManager")
    }
    msg.reply(Perms.join(" "))
}

module.exports.helpText = `Check current permission level`

module.exports.Category = `Dev`

module.exports.RequiredPermissions = []
