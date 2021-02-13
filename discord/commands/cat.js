const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    const ImageURL = await helpers.GetCatDogImage('http://thecatapi.com/api/images/get?format=json')
    console.log(ImageURL)
    msg.reply(embeds.SendImageEmbed(ImageURL, 'Cat'))
}

module.exports.helpText = `Gets an image of a cute cat`

module.exports.Category = `Fun`
