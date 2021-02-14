
// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
    if (CommandStruct.args.length === 0) {
        return CommandStruct.message.channel.send("Must provide a command to reload. Derp.")
    }

    const command = CommandStruct.args[0]

    // Get a path to the commands directory
    const normalizedPath = require('path').join(__dirname)
    const commandExists = require('fs').readdirSync(normalizedPath).includes(command + '.js')


    if (commandExists) {
        delete require.cache[require.resolve('./'+command + '.js')]
        CommandStruct.message.client.CommandRegistry[command] = require('./'+command)
        CommandStruct.message.channel.send(`The command \`${command}\` has been reloaded`)
    }
    else {
        CommandStruct.message.channel.send(`The command \`${command}\` does not exist`)
    }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Reloads a command`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Dev`