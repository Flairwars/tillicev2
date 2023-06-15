/** This is a test command to show what command files should look like */
const FWApi = require('../../api/fwapi')

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
    CommandStruct.message.reply("You cannot run this on a server for security reasons. Try DMing me!")
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Set the FWApi password for your account. IF YOU USE THIS ON A SERVER, EVERYONE WILL SEE YOUR PASSWORD!!!`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Mod`

module.exports.RequiredPermissions = []