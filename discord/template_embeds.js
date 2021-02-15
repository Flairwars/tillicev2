const Discord = require('discord.js')

let BaseEmbed = () => {
    return new Discord.MessageEmbed()
        .setColor('#888888')
        .setFooter('Tilice v2')
}


let ErrorEmbed = () => {
    return new Discord.MessageEmbed()
        .setColor('#B10c06')
        .setFooter('Tilice v2')
        .setImage('https://i.imgur.com/5b3Misq.png')
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


module.exports.SendImageEmbed = (ImageURL, Caption) => {
    let Embed = BaseEmbed()
    Embed.setImage(ImageURL)
    Embed.setTitle(Caption)
    return Embed
}


module.exports.SendEmbed = (Title, Text) => {
    let Embed = BaseEmbed()
    Embed.setTitle(Title)
    Embed.setDescription(Text)
    return Embed
}


module.exports.SendErrorEmbed = (Title, Text) => {
    let Embed = ErrorEmbed()
    Embed.setTitle(Title)
    Embed.setDescription(Text)
    return Embed
}
