const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

const subreddit = 'cursedimages'

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    const ImageURL = await helpers.getRandomRedditImage(subreddit)
    console.log("Image URL:" + ImageURL)
    if(ImageURL == undefined){
        msg.reply(embeds.SendErrorEmbed('Error', 'No image was found'))
        console.log("Error Reported: No Image Found")
    } else{
        msg.reply(embeds.SendImageEmbed(ImageURL, `An image off of r/${subreddit}`))
    }
}

module.exports.helpText = `Gets an image off of r/${subreddit}`

module.exports.Category = `Images`
