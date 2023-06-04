const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    const ImageURL = await helpers.GetFoxImage('https://randomfox.ca/floof/')
    msg.reply({embeds: [embeds.SendImageEmbed(ImageURL, 'Fox')]})
}

module.exports.helpText = `Gets an image of a cute fox`

module.exports.Category = `Fun`

module.exports.RequiredPermissions = []