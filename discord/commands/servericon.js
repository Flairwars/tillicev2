const embeds = require('../template_embeds')

module.exports.run = (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    msg.reply({embeds: [embeds.SendImageEmbed(msg.guild.iconURL(), msg.guild.name)]})
}

module.exports.helpText = `Get the server icon of the current server`

module.exports.Category = `Utility`

module.exports.RequiredPermissions = []