/** This is a test command to show what command files should look like */
const redditClient = require('../../reddit/init')
const embeds = require('../template_embeds')

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
//   const flairwarsInfo = require('../flairwarsInfo');
//   const redditClient = require('../reddit/init');

  // No arguments passed
  if (CommandStruct.args.length === 0) {
    CommandStruct.message.channel.send('Please specify a colour')
    return
  }

  switch (CommandStruct.args[0]) {
    case 'red':
      ComposeCount('dsrred', CommandStruct, 5)
      break

    case 'orange':
    case 'pink':
      ComposeCount('eternalorange', CommandStruct, 5)
      break

    case 'yellow':
      ComposeCount('yellowonlineunion', CommandStruct, 5)
      break

    case 'green':
      ComposeCount('thegreenarmy', CommandStruct, 5)
      break

    case 'blue':
      ComposeCount('azureempire', CommandStruct, 5)
      break

    case 'purple':
      ComposeCount('purpleimperium', CommandStruct, 5)
      break

    case 'fsr':
    case 'flairshootingrange':
      ComposeCount('flairshootingrange', CommandStruct, 5)
      break

    case 'oil':
      ComposeCount('theoilfields', CommandStruct, 5)
      break

    case 'doubleslash':
      ComposeCount('fwbattlesuba', CommandStruct, 5)
      break

    case 'singleslash':
      ComposeCount('fwbattlesubb', CommandStruct, 5)
      break

    case 'noslash':
      ComposeCount('fwbattlesubc', CommandStruct, 5)
      break
      // Standard Battle Subs - Uncomment and set up when they're made

      // case 'battlered':
      //     break;

      // case 'battleorange':
      //     break;

      // case 'battleyellow':
      //     break;

      // case 'battlegreen':
      //     break;

      // case 'battleblue':
      //     break;

      // case 'battlepurple':
      //     break;

    default:
      CommandStruct.message.channel.send("I can't do counts on that, sorry!")
  }
}

const GetPage = async (subreddit, after) => {
  return await redditClient.getSubreddit(subreddit)
    .getHot({ limit: 25, after })
    .filter(post => !post.stickied)
}

const GetUserColor = async (user) => {
  return await (await redditClient.getSubreddit('flairwars')).getUserFlair(user).catch(e => {
    console.log("Couldn't read user flair. Am I mod on r/flairwars?")
    throw new Error()
  })
}

const ComposeCount = async (subreddit, CommandStruct, pages) => {
  const PostPerPageData = []

  let after = 0

  CommandStruct.message.channel.send('Just a moment, processing...')

  // This creates a 2D array (within PostPerPageData) of the top 5 pages
  for (let i = 0; i < pages; i++) {
    const posts = await GetPage(subreddit, after)
    PostPerPageData.push(posts)
    after = posts[posts.length - 1].name
  }

  const UserColorMapping = {}

  // This will create the user => color mapping
  for (let i = 0; i < PostPerPageData.length; i++) {
    // console.log(PostPerPageData[i])
    for (let j = 0; j < PostPerPageData[i].length; j++) {
      const post = PostPerPageData[i][j]
      if (!UserColorMapping.hasOwnProperty(post.author.name)) {
        const UserColor = await GetUserColor(post.author.name).catch(CommandStruct.message.channel.send({ embeds: [embeds.ErrorEmbed()] }))
        UserColorMapping[post.author.name] = UserColor.flair_css_class
      }
    }
  }

  const CountDataPerPage = []

  for (let i = 0; i < PostPerPageData.length; i++) {
    // console.log(PostPerPageData[i])
    const ColorCountData = {}
    const UserCountData = {}
    for (let j = 0; j < PostPerPageData[i].length; j++) {
      const post = PostPerPageData[i][j]

      if (!ColorCountData.hasOwnProperty(UserColorMapping[post.author.name])) ColorCountData[UserColorMapping[post.author.name]] = 0
      ColorCountData[UserColorMapping[post.author.name]] += 1
      if (!UserCountData.hasOwnProperty(post.author.name)) UserCountData[post.author.name] = 0
      UserCountData[post.author.name] += 1
    }
    CountDataPerPage.push({
      page: i + 1,
      color: ColorCountData,
      users: UserCountData
    })
  }

  let textCount = `**Count for r/${subreddit}**\n`

  for (let i = 0; i < CountDataPerPage.length; i++) {
    const PageData = CountDataPerPage[i]
    textCount += `\n**__Page ${PageData.page}:__**\n`
    Object.keys(PageData.color).forEach(color => {
      textCount += `> **${color.charAt(0).toUpperCase() + color.slice(1)}**: ${PageData.color[color]}\n`
    })

    textCount += '\n'

    if (CommandStruct.args[1] === 'users') {
      textCount += '__User Counts:__\n'
      Object.keys(PageData.users).forEach(user => {
        textCount += `> ${user}: ${PageData.users[user]}\n`
      })
    }
  }

  CommandStruct.message.channel.send(textCount)
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = 'Counts number of posts per hot page for the given colour subreddit.'

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = 'Utility'

module.exports.RequiredPermissions = []
