const guildCfg = require('../guildCfg')
const templateEmbeds = require('../template_embeds')

module.exports.run = async (CommandStruct, PermStruct) => {
  const errorEmbed = templateEmbeds.ErrorEmbed()

  const msg = CommandStruct.message

  if (!msg.inGuild) {
    msg.channel.send({ embeds: templateEmbeds.SendErrorEmbed('This command can only be called from a server.') })
  }

  let allChannels = {}
  try {
    allChannels = await msg.guild.channels.fetch()
  } catch (e) {
    console.log(e)
    msg.channel.send({ embeds: templateEmbeds.SendErrorEmbed('Something went wrong.') })
    return
  }

  const channels = Object.keys(guildCfg).flatMap(channelName => {
    if (channelName == null) {
      return null
    }
    if (channelName === 'slowmodedChannels') {
      return null
    } else {
      return checkChannel(allChannels, guildCfg[`${channelName}`], `${channelName}`)
    }
  })
    .filter(elem => elem !== '' && elem !== undefined)

  if (channels.length !== 0) {
    errorEmbed.addFields({ name: 'Channels not found', value: channels.join(', ') })
    msg.channel.send({ embeds: [errorEmbed] })
  } else {
    msg.channel.send('No issues found.')
  }
}

const notChannels = ['suggestionTreshold', 'GuildInfo']

function checkChannel (allChannels, id, name) {
  // not a channel
  if (notChannels.find(c => c === name) !== undefined) {
    return ''
  }

  if (allChannels.find(c => c.id === id) != null) {
    return ''
  } else {
    return name
  }
}

module.exports.helpText = 'Checks whether certain things work and certain parameters are set up correctly.'

module.exports.Category = 'Dev'

module.exports.RequiredPermissions = ['BotManager']
