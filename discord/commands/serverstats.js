const Discord = require("discord.js");

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    const guild = msg.guild
    // Cache the Members
    guild.members.fetch()
    const date = guild.createdAt
    var embed = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL)
        .setFooter(`ID: ${guild.id} | Server created: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`) // Month +1 because of course it is zero-indexed
        .addField("Owner", await guild.members.fetch(guild.ownerID), true)
        .addField("Region", guild.region, true)
        .addField("Categories", guild.channels.cache.filter(channel => channel.type === 'category').size, true)
        .addField("Text channels", guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField("Voice channels", guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
        .addField("Members", guild.memberCount, true)
        .addField("Humans", guild.members.cache.filter(member => !member.user.bot).size, true)
        .addField("Bots", guild.members.cache.filter(member => member.user.bot).size, true)
        .addField("Online", guild.members.cache.filter(member => member.presence.status === 'online').size, true)
        .addField("Roles", guild.roles.cache.size, true)
        .addField("Moderators", Array.from(guild.members.cache
                                            .filter(member => member.hasPermission('ADMINISTRATOR')) // Filter mods
                                            .values())  // Convert the map values to an array
                                        .join('\n'))   // Join the array values by a newline to print them out nicely
        msg.reply(embed)

}

module.exports.helpText = `Gets information about the server`

module.exports.Category = `Utility`

module.exports.RequiredPermissions = []
