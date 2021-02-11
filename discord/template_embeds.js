const Discord = require('discord.js')

let BaseEmbed = () => {
    return new Discord.MessageEmbed()
        .setColor('#888888')
        .setFooter('Tilice v2')
}


module.exports.GeneralHelpEmbed = (HelpResponseStruct) => {
    let Embed = BaseEmbed()
    // Use the struct we built to populate an embed
    Object.keys(HelpResponseStruct).forEach( category => {
        Embed.addField(category, HelpResponseStruct[category].join(', '))
    })
    return Embed
}


module.exports.CommandHelpEmbed = (CommandName, CommandHelp) => {
    let Embed = BaseEmbed()
    Embed.addField(CommandName, CommandHelp)
    return Embed
}