/** This is a test command to show what command files should look like */

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
    console.log('Pong')
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Ping, for testing`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Sample Category`