const embeds = require('../template_embeds')

module.exports.run = async (CommandStruct, PermStruct) => {
  const msg = CommandStruct.message
  if (CommandStruct.args.length === 0) {
    msg.reply('Please specify a colour')
    return
  }

  // TODO: use fwapi

  let flag = ''
  switch (CommandStruct.args[0].toLowerCase()) {
    case 'red':
      flag = 'https://i.imgur.com/Mi8J0fq.png'
      break
    case 'orange':
    case 'pink':
      flag = 'https://media.discordapp.net/attachments/703431121857282108/711885744280436736/3_5.png'
      break
    case 'yellow':
      flag = 'https://i.imgur.com/WB8mUHl.png'
      break
    case 'green':
      flag = 'https://i.imgur.com/MNKwjES.jpg'
      break
    case 'blue':
      flag = 'https://i.imgur.com/tmFG3VI.png'
      break
    case 'purple':
      flag = 'https://i.imgur.com/rZFSCIP.jpg'
      break
    case 'oil':
    case 'mod':
      flag = 'https://cdn.discordapp.com/attachments/506018154078666752/590846311775862785/yeghet.png'
      break
    case 'smart':
      flag = 'https://i.imgur.com/xP4tT9K.png'
      break
    case 'void':
      flag = 'https://i.imgur.com/WB4CnNv.jpg'
      break
    default:
      flag = null
  }

  if (flag) {
    msg.reply({ embeds: [embeds.SendImageEmbed(flag, CommandStruct.args[0].toLowerCase())] })
  } else {
    msg.reply('Please specify a valid colour')
  }
}

module.exports.helpText = 'Gets the flag of a colour'

module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
