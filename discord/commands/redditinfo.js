const r = require('../../reddit/init')

module.exports.run = (CommandStruct, PermStruct) => {
    // TODO: First try the API to see if they're registered
    if (CommandStruct.args.length == 0) {
        CommandStruct.message.channel.send('Please enter a reddit username after the command')
    }
    else {
        r.getUser(CommandStruct.args[0]).fetch( thisUser => {
            if (thisUser) {
                console.log(thisUser)
            }
            else {
                CommandStruct.message.channel.send(`I couldn't find the user ${CommandStruct.args[0]}, try again`)
            }
        })
    }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `See a user's reddit information`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Utility`

module.exports.RequiredPermissions = []