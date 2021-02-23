/** This is a test command to show what command files should look like */
const redditClient = require("../../reddit/init");
const embeds = require('../template_embeds')

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
//   const flairwarsInfo = require('../flairwarsInfo');
//   const redditClient = require('../reddit/init');


  // No arguments passed
  if (CommandStruct.args.length === 0) {
      CommandStruct.message.channel.send("Please specify a colour");
      return;
  }

  switch (CommandStruct.args[0]) {
        case 'red':
            break;

        case 'orange':
        case 'pink':
            ComposeCount('orange', 'eternalorange', CommandStruct, 5)
            break;

        case 'yellow':
            break;

        case 'green':
            break;

        case 'blue':
            break;

        case 'purple':
            break;

        case 'fsr':
        case 'flairshootingrange':
            break;

        case 'oil':
            break;

        case 'battlered':
            break;

        case 'battleorange':
            break;
            
        case 'battleyellow':
            break;
                
        case 'battlegreen':
            break;
                    
        case 'battleblue':
            break;
                            
        case 'battlepurple':
            break;
        
        default:
            CommandStruct.message.channel.send("I can't do counts on that, sorry!");
            return;
  }

};


let GetPage = async (subreddit, after) => {
    return await redditClient.getSubreddit(subreddit)
                    .getHot({ limit: 25, after: after})
                    .filter( post => !post.stickied)
}

let ComposeCount = async (color, subreddit, CommandStruct, pages) => {
    CommandStruct.message.channel.send(embeds.CountEmbed(color, subreddit)).then( countMsg => {
        for (let i = 0; i < pages; i++) {
            console.log(`COUNTING PAGE ${i}`)
            let msgEmbed = countMsg.embeds[0]
            let after = 0

            
            GetPage(subreddit, after).then( posts => {
                console.log(after)
                let authors = posts.map(post => post.author.name)
                let uniqueAuthors = [...new Set(authors)]
                let colorObj = {}
                uniqueAuthors.forEach(author => {
                    // TODO: Will first attempt to get user color from API
                    redditClient.getSubreddit('flairwars').getUserFlair(author).then(flair => {
                        let flairColor = flair.flair_css_class
                        colorObj[author] = flairColor
                    }).catch( snoowrapErr => console.error(snoowrapErr))
                }) 

                console.log(colorObj)

                let embedFieldTitle = `Page ${i+1} Count`
                let CountData = {
                    color: {},
                    users: {}
                }

                posts.forEach( post => {
                    if (!CountData.users.hasOwnProperty(post.author.name)) CountData.users[post.author.name] = 0
                    CountData.users[post.author.name] += 1
                    if (!CountData.color.hasOwnProperty(colorObj[post.author.name])) CountData.color[colorObj[post.author.name]] = 0
                    CountData.color[colorObj[post.author.name]] += 1
                })

                console.log(CountData)

                let EmbedFieldText = '**Color Counts**'

                Object.keys(CountData.color).forEach( fwColor => {
                    EmbedFieldText += `${fwColor}: ${CountData.color[fwColor]}/25\n`
                })

                EmbedFieldText += '\n**User Counts**\n'

                Object.keys(CountData.users).forEach( user => {
                    EmbedFieldText += `${user}: ${CountData.users[user]} posts\n`
                })

                msgEmbed.addField(embedFieldTitle, EmbedFieldText)

                countMsg.edit('', {embed: msgEmbed})

                after = posts[posts.length-1].name
            })
        }
    })
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Counts number of posts per hot page for the given colour subreddit.`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Utility`

module.exports.RequiredPermissions = []
