const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    const ImageURL = await helpers.getRandomRedditImage('sadcats')
    console.log("Image URL:" + ImageURL)
    msg.reply(embeds.SendImageEmbed(ImageURL, 'An image off of r/sadcats'))
}

module.exports.helpText = `Gets an image off of r/sadcats`

module.exports.Category = `Images`
