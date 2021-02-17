const client = require('../init');
const Discord = require("discord.js");

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    var role = msg.guild.roles.cache.find(role => role.name === "NewYears") // need a role named newyears
    const name = msg.author.tag
    if (CommandStruct.args.length == 0) {
        msg.reply("Please include a message")
        return
    } else if (msg.member.roles.cache.has(role.id)) {
        msg.reply("You already sent a message")
        return
    } else {
        let Embed = new Discord.MessageEmbed()
            .setColor(msg.member.displayHexColor)
            .setAuthor(name, msg.author.displayAvatarURL)
            .setFooter(msg.author.id)
            .setTimestamp()
        Embed.addField("Message:", CommandStruct.args.join(' '))
        client.Client.channels.cache.get('811736656687792128').send(Embed) // 653002441649815571
        msg.member.roles.add(role)
        msg.reply("New Year's message sent")
    }

}

module.exports.helpText = `Sends a message for New Year's`

module.exports.Category = `Fun`

module.exports.RequiredPermissions = []
