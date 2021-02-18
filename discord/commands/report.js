const embeds = require('../template_embeds')

// This is a remporary file that will hold configuration for things like suggestions channels and request channels
const guildCfg = require('../guildCfg')

module.exports.run = (CommandStruct, PermStruct) => {

    if (CommandStruct.args.length == 0) {
        CommandStruct.message.channel.send(embeds.SendErrorEmbed('Invalid arguments', 'Please type use this command in the format `report user reason`'))
    }
    else {
        const reportedUser = CommandStruct.args[0]
        const reason = CommandStruct.args.slice(1, CommandStruct.args.length).join(' ')
        CommandStruct.message.guild.channels.cache.get(guildCfg.reportsChannel).send(embeds.ReportEmbed(`${CommandStruct.message.member.displayName}`, reportedUser, reason))
    }
}

module.exports.helpText = `Request a modular role`

module.exports.Category = `Utility`

module.exports.RequiredPermissions = []