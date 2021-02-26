const perms = require('../eval_perms')

const guildCfg = require('../guildCfg')

module.exports.run = (CommandStruct, PermStruct) => {
    
}

module.exports.helpText = `Updates the colour of the suggestion embeds.`

module.exports.Category = `Mod`

module.exports.RequiredPermissions = [perms.levels.Admin]