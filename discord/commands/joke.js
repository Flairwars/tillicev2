const embeds = require('../template_embeds')
const helpers = require('../helpers.js');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    const Joke = await helpers.GetJoke('https://icanhazdadjoke.com/')
    msg.reply(embeds.SendEmbed('Joke', Joke))
}

module.exports.helpText = `Gets a random joke`

module.exports.Category = `Fun`
