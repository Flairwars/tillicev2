const Discord = require('discord.js')

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message

    // If there are no arguments take the author. Otherwise look for a mention
    let member = (CommandStruct.args.length === 0) ? msg.member : msg.mentions.members.first()

    // If no mention was saved in member
    if (!member) {
        // Search through all the nicknames in the guild
        guildNickMatch = msg.guild.members.cache
            .filter(m => m.nickname)
            .find(m => m.nickname.toLowerCase().includes(CommandStruct.args[0].toLowerCase()))
        member = guildNickMatch

        // If there's still no member that was found
        if (!member) {
            // Find a fitting Discurd user name
            discordUsernameMatch = msg.guild.members.cache.find(m => m.user.username.toLowerCase().includes(CommandStruct.args[0].toLowerCase()))

            member = discordUsernameMatch

            // If there is still no member
            if (!member) {
                msg.channel.send(`Cannot find member with username \`${CommandStruct.args[0]}\` on this Discord server.`)
                return
            }
        }
    }

    // Build the embed with the avatar
    let embed = new Discord.MessageEmbed()
        .setImage(member.user.avatarURL())
        .setColor(0xC9DDFF)

    msg.channel.send(embed)
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `"Displays the avatar of the user.`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Misc`