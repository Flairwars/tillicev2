const embeds = require('../template_embeds')

module.exports.run = async (CommandStruct, PermStruct) => {
  const msg = CommandStruct.message
  if (msg.content.indexOf('{') === -1) {
    msg.react('👍')
    msg.react('👎')
    msg.react('🤷')
  } else {
    const firstBracket = msg.content.indexOf('{')
    if (msg.content.indexOf('}') === -1) {
      msg.reply('Incorrect syntax for multi-option poll ')
      return
    }

    const secondBracket = msg.content.indexOf('}')
    const title = msg.content.substring(firstBracket + 1, secondBracket)
    const text = msg.content.substr(secondBracket + 1)

    const emojiList = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
    const options = parseOptions(msg, text)
    if (options === undefined) {
      return
    }
    if (options.length > 20) {
      msg.reply('Too many options (maximum 20)')
      return
    } else if (options.length === 0) {
      msg.reply('Too few options (minimum 1)')
      return
    }

    let optionsText = ''
    for (let i = 0; i < options.length; i++) {
      optionsText += emojiList[i] + ' ' + options[i] + '\n\n'
    }
    const reply = await msg.reply({ embeds: [embeds.SendEmbed(title, optionsText)] })
    for (let i = 0; i < options.length; i++) {
      reply.react(emojiList[i])
    }
  }
}

function parseOptions (msg, text) {
  const options = []
  do {
    const first = text.indexOf('[')
    const second = text.indexOf(']')
    if (first === -1 || second === -1) {
      const regexNonWhitespace = /\S/
      // If there is a trailing whitespace, just break from the loop.
      // If there is more, send incorrect syntax message and terminate command execution.
      if (text.match(regexNonWhitespace)) {
        msg.reply('Incorrect syntax for multi-option poll ')
        return
      }
      break
    }
    options.push(text.substring(first + 1, second))
    text = text.substr(second + 1)
  } while (text.length > 0)
  return options
}

module.exports.helpText = 'Simple and multi-option polls'

module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
