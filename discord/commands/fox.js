const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    const ImageURL = await helpers.GetFoxImage('https://randomfox.ca/floof/')
    console.log(ImageURL)
    msg.reply(embeds.SendImageEmbed(ImageURL, 'Fox'))
}

module.exports.helpText = `Gets an image of a cute fox`

module.exports.Category = `Fun`
