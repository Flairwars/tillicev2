
module.exports.eval = (commandRequredPermissions, PermStruct) => {
    let MeetsRequirements = []
    commandRequredPermissions.forEach( permission => {
        switch(permission) {
            case 'Admin':
                MeetsRequirements.push(PermStruct.Administrator)
                break;
            case 'BotManager':
                MeetsRequirements.push(PermStruct.BotManager)
                break;
        }
    })

    // If a command has no requirements, push true onto the array so it can be evaluated as true
    if (commandRequredPermissions.length == 0) MeetsRequirements.push(true)

    return MeetsRequirements.every(requirement => requirement === true)
}

// Export Types for ease of use. Import this file and use <name>.levels.Admin for example
module.exports.levels = {
    Admin: 'Admin',
    BotManager: 'BotManager'
}