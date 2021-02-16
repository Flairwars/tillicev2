const embeds = require('../template_embeds')

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    if (CommandStruct.args.length === 0) {
        msg.reply("Please specify a colour")
        return
    }

    var flag;
    if (CommandStruct.args[0].toLowerCase() === "red") {
        flag = "https://i.imgur.com/Mi8J0fq.png"
    } else if (CommandStruct.args[0].toLowerCase() == "orange" || CommandStruct.args[0].toLowerCase() == "pink") {
        flag = "https://media.discordapp.net/attachments/703431121857282108/711885744280436736/3_5.png"
    } else if (CommandStruct.args[0].toLowerCase() == "yellow") {
        flag = "https://i.imgur.com/WB8mUHl.png"
    } else if (CommandStruct.args[0].toLowerCase() == "green") {
        flag = "https://i.imgur.com/MNKwjES.jpg"
    } else if (CommandStruct.args[0].toLowerCase() == "blue") {
        flag = "https://i.imgur.com/IymoMsy.png"
    } else if (CommandStruct.args[0].toLowerCase() == "purple") {
        flag = "https://i.imgur.com/rZFSCIP.jpg"
    } else if (CommandStruct.args[0].toLowerCase() == "oil" || CommandStruct.args[0].toLowerCase() == "mod") {
        flag = "https://cdn.discordapp.com/attachments/506018154078666752/590846311775862785/yeghet.png"
    } else if (CommandStruct.args[0].toLowerCase() == "smart") {
        flag = "https://i.imgur.com/xP4tT9K.png"
    } else if (CommandStruct.args[0].toLowerCase() == "void") {
        flag = "https://i.imgur.com/WB4CnNv.jpg"
    } else {
        msg.reply("Please specify a valid colour")
        return
    }
    msg.reply(embeds.SendImageEmbed(flag, CommandStruct.args[0].toLowerCase()))
}

module.exports.helpText = `Gets the flag of a colour`

module.exports.Category = `Utility`

module.exports.RequiredPermissions = []