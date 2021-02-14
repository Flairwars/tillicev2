const embeds = require('../template_embeds');
const helpers = require('../helpers.js');
const struct = require('../struct_builder')


module.exports.run = async (CommandStruct, PermStruct) => {

    let title;
    let description;
    let msg = CommandStruct.message;
    let CommandSubstring = msg.content.split('~')[1].split(' ') // Splits up a command message
    let args = CommandSubstring.slice(1, CommandSubstring.length+1)
    
    CommandStruct.command = CommandSubstring[0] // The first string in the substring array
    CommandStruct.args = CommandSubstring.slice(1, CommandSubstring.length+1) // Pass the rest of the message as args

    const argText = args[0] === undefined ? "" : args[0]
    console.log(argText)
    switch(argText) {
        case '1':
            title = "Obey the Moderators"
            description = "We are here to make this server enjoyable for everyone by enforcing the rules, they’re here for a reason. Follow the instructions of the (Mini) Moderators when requested."
            break;
        case '2':
            title = "Follow the Code of Conduct"
            description = "By using this Discord server and the associated subreddit, you agree to follow and adhere to the Code of Conduct: <https://goo.gl/s7HdEx>"
            break;
        case '3':
            title = "Keep it Civil"
            description = "This discord is for civil discussion between colours and for secret planning within them. This is not a place for raiding. Keep the banter lighthearted, remember that there's a human sitting somewhere on the other side."
            break;
        case '4':
            title = "No Spamming"
            description = "Both text and image spam are allowed in <#463830202598948864> and is tolerated in <#493942605432750081> during community events. Don't spam anywhere else."
            break;
        case '5':
            title = "No excessive Pinging"
            description = "Don't excessively mention users who didn't consent to that, especially in a time inconvenient for their timezone."
            break;
        case '6':
            title = "No mass Pinging"
            description = "Do not ping roles unless absolutely necessary. The suppressed atEveryone and atHere pings count as mass pings too. \n \n If you need to alert your colour to a raid, you should contact someone from your colour leadership. \n \n Mass pinging colours outside of the colour / diplomatic chats, or mass pinging anyone without a good reason will get you muted."
            break;
        case '7':
            title = "Stay on topic, in a correct channel"
            description = "Text channels should include content that is relevant to the channel topic. If you are off-topic, someone might ask you to move to the correct channel. \n \n A general rule to follow is: A (mini) moderator asking you to move is a command, a user asking you is optional. This rule does not include moderator commands."
            break;
        case '8':
            title = "Keep General as image free as possible"
            description = "Be mindful to people on mobile data and don't post images to <#463794005231271978> unless necessary. No context images belong to <#463830202598948864>."
            break;
        case '9':
            title = "Keep General lighthearted"
            description = "Serious topics belong to the Serious category channels. Controversial topics don't belong to this server at all."
            break;
        case '10':
            title = "No NSFW"
            description = "Very mild NSFW references allowed in <#463830202598948864>. This is not a NSFW friendly server."
            break;
        case '11':
            title = "Bot commands in the dedicated channels only"
            description = "Do bot commands only in the channels that are dedicated for it, like <#466007165975658506> , <#473899346568544256> or <#463830202598948864>. \n \n Don't try to invoke them in other channels, namely <#463794005231271978>, regardless if they are allowed there or not and regardless if you have permissions to use them or not. \n \n You can use the `~topic` command in <#463794005231271978>, but don't spam it and don't interrupt the conversation flow with it. \n \n The exception to this rule are the(mini)mod only commands, invoked by(mini)mods."
            break;
        case '12':
            title = "Don't misuse commands"
            description = "Don't use bot commands to bypass channel slowmode or otherwise misuse bot commands."
            break;
        case '13':
            title = "Follow channel specific rules"
            description = "Some channels, like <#466292953959104512>, have their own specific rules. Please see the pinned messages of the channels and follow those rules."
            break;
        case '14':
            title = "No Cheese related puns 🧀"
            description = "Cheese puns will result in a perminant ban. That wouldn't brie very nice."
            break;
        default:
            title = "No rule defined.";
            description = "For a complete list of rules, head to: <#463831713651359774>"        
    }
    msg.reply(embeds.SendTextEmbed(title, description))
}

module.exports.helpText = `Shows a specified rule from the #rules channel`

module.exports.Category = `Moderating`