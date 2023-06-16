module.exports.run = async (CommandStruct, PermStruct) => {
  const msg = CommandStruct.message
  const EmojiList = msg.guild.emojis.cache.map(e => e.toString())
  const emo2 = `${EmojiList}`
  const EmojiArray = emo2.split(',')
  await msg.channel.send('**Vote whether to keep or remove the following Emojis:**')
  EmojiArray.forEach(async emote => {
    const NewMessage = await msg.channel.send(emote)
    await NewMessage.react('👍') // thumbsup
    await NewMessage.react('👎') // thumbsdown
    await NewMessage.react('🤷') // shrug
  })
}

module.exports.helpText = 'Creates archival polls for each emoji'

module.exports.Category = 'Mod'

module.exports.RequiredPermissions = ['Admin', 'BotManager']
