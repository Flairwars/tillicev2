const { EmbedBuilder } = require('discord.js')

const BaseEmbed = () => {
  return new EmbedBuilder()
    .setColor('#888888')
    .setFooter({ text: 'Tillice v2' })
}

module.exports.ErrorEmbed = () => {
  return new EmbedBuilder()
    .setColor('#B10c06')
    .setFooter({ text: 'Tillice v2' })
    .setImage('https://i.imgur.com/5b3Misq.png')
}

const fwFlavoredEmbed = (color) => {
  const newEmbed = new EmbedBuilder()
  switch (color) {
    case 'red':
      newEmbed.setColor('#ff0000')
      newEmbed.setThumbnail('https://i.imgur.com/Mi8J0fq.png')
      break
    case 'orange':
      newEmbed.setColor('#ff8800')
      newEmbed.setThumbnail('https://media.discordapp.net/attachments/703431121857282108/711885744280436736/3_5.png')
      break
    case 'yellow':
      newEmbed.setColor('#ffff00')
      newEmbed.setThumbnail('https://i.imgur.com/WB8mUHl.png')
      break
    case 'green':
      newEmbed.setColor('#00ff00')
      newEmbed.setThumbnail('https://i.imgur.com/MNKwjES.jpg')
      break
    case 'blue':
      newEmbed.setColor('#0000ff')
      newEmbed.setThumbnail('https://i.imgur.com/IymoMsy.png')
      break
    case 'purple':
      newEmbed.setColor('#880088')
      newEmbed.setThumbnail('https://i.imgur.com/rZFSCIP.jpg')
      break
    case 'mod':
      newEmbed.setColor('#ffffff')
      newEmbed.setThumbnail('https://cdn.discordapp.com/attachments/506018154078666752/590846311775862785/yeghet.png')
      break
    default:
      newEmbed.setColor('#888888')
      break
  }
  newEmbed.setFooter({ text: 'Tillice v2' })

  return newEmbed
}

module.exports.GeneralHelpEmbed = (HelpResponseStruct) => {
  const Embed = BaseEmbed()
  // Use the struct we built to populate an embed
  Object.keys(HelpResponseStruct).forEach(category => {
    Embed.addFields({ name: category, value: HelpResponseStruct[category].join(', ') })
  })
  return Embed
}

module.exports.CommandHelpEmbed = (CommandName, CommandHelp) => {
  const Embed = BaseEmbed()
  Embed.addFields({ name: CommandName, value: CommandHelp })
  return Embed
}

module.exports.SendImageEmbed = (ImageURL, Caption) => {
  const Embed = BaseEmbed()
  Embed.setImage(ImageURL)
  Embed.setTitle(Caption)
  return Embed
}

module.exports.SendEmbed = (Title, Text) => {
  const Embed = BaseEmbed()
  Embed.setTitle(Title)
  Embed.setDescription(Text)
  return Embed
}

module.exports.SendErrorEmbed = (Title, Text) => {
  const Embed = this.ErrorEmbed()
  Embed.setTitle(Title)
  Embed.setDescription(Text)
  return Embed
}

module.exports.RequestEmbed = (user, type, request) => {
  const Embed = BaseEmbed()
  Embed.setTitle(`New ${type} Request`)
  Embed.setDescription(`From user ${user} requesting ${request}`)

  return Embed
}

module.exports.ReportEmbed = (reporter, user, reason) => {
  const Embed = BaseEmbed()
  Embed.setTitle(`Report Issued by ${reporter}`)
  Embed.setDescription(`Reporting ${user} for: ${reason}`)
  return Embed
}

module.exports.topicSuggestion = (user, suggestion) => {
  const Embed = BaseEmbed()
  Embed.setTitle(`Suggestion by ${user}`)
  Embed.setDescription(suggestion)
  return Embed
}

module.exports.SkeletonEmbed = () => {
  return BaseEmbed()
}

module.exports.suggestionVotingEmbed = (user, userPfp, suggestion, link) => {
  const Embed = BaseEmbed()
  Embed.setAuthor({ name: `Suggestion by ${user}`, iconURL: userPfp })
    .setDescription(suggestion)
    .setTimestamp()
    .addFields({ name: 'Talk about it!', value: `[Jump to discussion](${link})` })
  return Embed
}

module.exports.suggestionDiscussionEmbed = (user, userPfp, suggestion, link) => {
  const Embed = BaseEmbed()
  Embed.setAuthor({ name: `Suggestion by ${user}`, iconURL: userPfp })
    .setDescription(suggestion)
    .setTimestamp()
    .addFields({ name: 'Talk about it!', value: `[Vote on it](${link})` })
  return Embed
}

module.exports.redditInfoEmbed = (color, username, creationDate, totalKarma, linkKarma, commentKarma, awarderKarma, awardeeKarma) => {
  const Embed = fwFlavoredEmbed(color)
  Embed.setTitle(username)
  Embed.setDescription(`[${username}](https://reddit.com${username})`)
  Embed.addFields([
    { name: 'Flair', value: color, inline: true },
    { name: 'Account created', value: creationDate, inline: true },
    { name: 'Total Karma', value: totalKarma, inline: true },
    { name: 'Karma Breakdown', value: `Post karma: ${linkKarma}\nComment Karma: ${commentKarma}\nAwarder Karma: ${awarderKarma}\nAwardee Karma: ${awardeeKarma}` }
  ])
  return Embed
}

module.exports.CountEmbed = (color, subreddit) => {
  const Embed = BaseEmbed()

  Embed.setTitle(`Count for ${subreddit}`)

  return Embed
}
