const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    let member = helpers.getGuildMemberFromCommandStruct(CommandStruct);

    if (!member) {
        msg.channel.send(`Cannot find member with username \`${CommandStruct.args[0]}\` on this Discord server.`)
    }
    else {
        msg.channel.send({embeds: [embeds.SendImageEmbed(member.user.avatarURL({size: 1024}), member.displayName)]})
    }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `"Displays the avatar of the user.`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Misc`

module.exports.RequiredPermissions = []
