/** This is a test command to show what command files should look like */

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
  const Discord = require('discord.js')

  const flairwarsInfo = require('../flairwarsInfo')
  // No arguments passed
  if (CommandStruct.args.length === 0) {
    CommandStruct.message.channel.send('Please specify a colour')
    return
  }

  if (CommandStruct.args[0].startsWith('r/')) {
    CommandStruct.message.channel.send('Please specify a colour, not a subreddit')
    return
  }

  const flairInfo = flairwarsInfo.flairInfo

  const colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']

  if (colours.some(colour => colour.toLowerCase() === CommandStruct.args[0].toLowerCase())) {
    // const colours = flairwarsInfo.colours;
    let colourSubreddit
    let flag
    let sideHex
    let colourSubLink

    // If the input is a colour (defined in flairwarsInfo.colours) - excluding mods, for example
    if (colours.some(colour => colour.toLowerCase() === CommandStruct.args[0].toLowerCase())) {
      colourSubreddit = flairwarsInfo.flairInfo[CommandStruct.args[0].toLowerCase()].subreddit
      flag = flairwarsInfo.flairInfo[CommandStruct.args[0].toLowerCase()].squareIconUrl
      sideHex = flairwarsInfo.flairInfo[CommandStruct.args[0].toLowerCase()].colourHex
      colourSubLink = 'https://www.reddit.com/r/' + colourSubreddit
    }
    console.log(colourSubreddit)

    const embed = new Discord.EmbedBuilder()
      .setDescription(colourSubLink)
      .setColor(sideHex)
      .setAuthor({ name: colourSubreddit, iconURL: flag, url: colourSubLink })

    CommandStruct.message.channel.send({ embeds: [embed] })
  } else {
    const subreddit = () => {
      switch (CommandStruct.args[0].toLowerCase()) {
        case 'pink':
          return flairInfo.orange.subreddit
        case 'mod':
        case 'moderator':
        case 'oil':
        case 'main':
        case 'flairwars':
        case 'void':
          return flairInfo.mod.subreddit
        case 'law':
        case 'laws':
        case 'flairlaws':
          return 'Flairlaws'
        case 'pet':
        case 'pets':
        case 'flairpets':
          return 'Flairpets'
        case 'news':
        case 'flairnews':
          return 'Flairnews'
        case 'onion':
        case 'flaironion':
          return 'Flaironion'
        case 'ssr':
        case 'sixsidedrainbow':
          return 'SixSidedRainbow'
        case 'other':
        case 'related':
          return 'other'
        default:
      }
    }

    if (subreddit() === 'other') {
      // if the subreddit specified is "other"

      const descriptionOther = flairwarsInfo.relatedSubreddits.join('>' + '\n' + '<https://www.reddit.com/r/')
      // list all subreddits from flairwarsInfo.relatedSubreddits in link form

      const embed2 = new Discord.EmbedBuilder()

        .setTitle('List of other Flairwars related subreddits:')
        .setDescription('<https://www.reddit.com/r/' + descriptionOther + '>')

      CommandStruct.message.channel.send({ embeds: [embed2] })
      return
    }

    if (!subreddit()) {
      // if there is no subreddit with the name specified, tell them they did it wrong
      CommandStruct.message.channel.send('Wrong syntax. The syntax is `~sub colour`')
      return
    }

    CommandStruct.message.channel.send(`https://www.reddit.com/r/${subreddit()}`)
  }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = 'Links the FW subreddits'

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
