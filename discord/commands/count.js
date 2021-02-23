/** This is a test command to show what command files should look like */
const redditClient = require("../../reddit/init");
const embeds = require('../template_embeds')

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
  const flairwarsInfo = require('../flairwarsInfo');
  const redditClient = require('../reddit/init');

  const CountableSubs = ['red', 'orange', 'pink', 'yellow', 'blue', 'green', 'purple', // Normal subs/aliases
                         'fsr', 'flairshootingrange', // shooting range/alias
                         'oil', // theoilfields
                         'br', 'bo', 'by', 'bb', 'bg', 'bp'] // battle subs

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


  // If the input is a colour (defined in flairwarsInfo.colours) - excluding mods, for example
  if (colours.some(colour => colour.toLowerCase() === CommandStruct.args[0].toLowerCase())) {
      colourSubreddit = flairwarsInfo.flairInfo[CommandStruct.args[0].toLowerCase()].subreddit;
  } else if (CommandStruct.args[0].toLowerCase() === "pink") {
      colourSubreddit = flairwarsInfo.flairInfo["orange"].subreddit;

  // Battle 22 addition
  } else if (CommandStruct.args[0].toLowerCase() === "battle") {
    var battleSubs = {"red":"Battle22Red","orange":"Battle22Orange","yellow":"Battle22Yellow","green":"Battle22Green","blue":"Battle22Blue","purple":"Battle22Purple"};
    colourSubreddit = battleSubs[CommandStruct.args[1].toLowerCase()];

  } else if (CommandStruct.args[0].toLowerCase() === "oil") {
      colourSubreddit = "TheOilFields";

  } else if (CommandStruct.args[0].toLowerCase() === "void") {
      colourSubreddit = "lairofthevoid";

  } else if (CommandStruct.args[0].toLowerCase() === "flairshootingrange") {
      colourSubreddit = "flairshootingrange";

  } else if (CommandStruct.args[0].toLowerCase() === "fsr") {
      colourSubreddit = "flairshootingrange";

  } else if (CommandStruct.args[0].toLowerCase() === "flairwars") {
      colourSubreddit = "flairwars";

  } else {
      CommandStruct.message.channel.send("Wrong syntax. The syntax is \`~count [colour]\`");
      return;
  }

  // Yaml syntax highlighting for that shiny turqouise colour header
  text = `\`\`\`yaml\n${colourSubreddit}\`\`\`\n`;
  var msg = CommandStruct.message.channel.send("Counting...");

  const flairs = flairwarsInfo.flairs;
  const numberOfHotPages = 5;
  // This is an identifier of the last post on the page
  var after = 0;

  for (var i = 1; i <= numberOfHotPages; i++) {
      msg = CommandStruct.message.edit(text + i + ". page, fetching data");
      const posts = getHotPage(redditClient, colourSubreddit, after);
      msg = CommandStruct.message.edit(text + i + ". page, verifying user flairs");

      // Create an array of post authors from the array of posts
      const authorsPerPage = posts.map(post => post.author.name);
      // This all is to reduce the amount of Reddit API requests - remove duplicate authors from the array
      const uniqueAuthorsPerPage = [...new Set(authorsPerPage)];
      const flairMap = new Map();
      // For each unique author on the current hot page, check their flair on the main sub
      // and save it into the map (with the author being the map key); (map ~ dictionary structure)
      for (var author of uniqueAuthorsPerPage) {
          const flair = r.getSubreddit("flairwars").getUserFlair(author);
          // If the user doesn't have any flair assigned on the main subreddit,
          // let's say that they have the "None" flair
          if (!flair.flair_text) {
              flairMap.set(author, 'None');
              continue;
          }
          // Unifies the seasonal flairs; for example, 'Yellow II', 'Yellow I' and 'Yellow'
          // are all compared to just 'Yellow'
          const flairColour = flairs.filter(flairText => flair.flair_text.includes(flairText))[0];
          // Replace this unified flair as the map value under the author key
          flairMap.set(author, flairColour);
      }

      msg = CommandStruct.message.edit(text + i + ". page, mapping users to flairs");
      // Remember that array of post authors per hot page? Let's transform it to an array of colour flairs now
      const flairsFromAuthors = authorsPerPage.map(author => flairMap.get(author));

      text = text + `**Number of posts on the ${i}. page:**\n`;
      // Count the number of occurrences for each colour
      flairs.forEach(colour => {
          const numberOfColourPosts = flairsFromAuthors.filter(flair => flair === colour).length;
          if (numberOfColourPosts > 0) {
              text = `${text}**${colour}:** ${numberOfColourPosts}\n`;
          }
      });

      text = text + '\n';
      msg = CommandStruct.message.edit(text);
      // Update the variable which stores the last post to fetch the next hotpage
      after = posts[posts.length - 1].name;
  }
};

async function getHotPage(redditClient, subreddit, after) {
  // Stickied posts are fetched, but don't count toward the 25 posts limit
  // Limit: how many posts; after: the last previous post (after = 0 fetches from the start)
  return redditClient.getSubreddit(subreddit)
                      .getHot({ limit: 25, after: after })
                      .filter(post => !post.stickied);
}


let GetPage = (subreddit, after) => {
    return redditClient.getSubreddit(subreddit)
                    .getHot({ limit: 25, after: after})
                    .filter( post => !post.stickied)
}

let ComposeCount = (subreddit, CommandStruct) => {
    let after = 0

    CommandStruct.channel.send()
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Counts number of posts per hot page for the given colour subreddit.`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Utility`
