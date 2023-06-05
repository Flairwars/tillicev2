const guildCfg = require('../guildCfg')
const template_embeds = require('../template_embeds')

module.exports.run = async (CommandStruct, PermStruct) => {
    let errorEmbed = template_embeds.ErrorEmbed()

    let msg = CommandStruct.message
    
    if(!msg.inGuild){
        msg.channel.send({embeds: template_embeds.SendErrorEmbed("This command can only be called from a server.")})
    }

    let guild = msg.guild
    let allChannels = await msg.guild.channels.fetch()

    channels = Object.keys(guildCfg).flatMap(channelName => {
        if(channelName == null){
            return
        }
        if(channelName == "slowmodedChannels"){
            return
        } else {
            return checkChannel(allChannels, guildCfg[`${channelName}`], `${channelName}`)
        }
    })
    .filter(elem => elem != "")

    if(channels.length > 0){
        channelError = channels
        errorEmbed.addFields({name: "Channels not found", value: channels.join(', ')})
        msg.channel.send({embeds: [errorEmbed]})
    } else {
        msg.channel.send("No issues found.")
    }
}

function checkChannel(allChannels, id, name){
    if(id in allChannels){
        return ""
    } else {
        return name
    }
}

module.exports.helpText = `Checks whether certain things work and certain parameters are set up correctly.`

module.exports.Category = `Dev`

module.exports.RequiredPermissions = ["Admin", "BotManager"]
