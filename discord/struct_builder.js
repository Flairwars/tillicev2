/** This file builds structs for use in the Discord Bot simplifying how permissions and commands
 * are parsed
 */

const MinimodRole = '475076640834191360'
const BotBuilderRole = '809204327692369930'

module.exports = (msg, guildID, memberID, cb) => {
    const PermStruct = {} // This will be passed along with all permission info
    const CommandStruct = {} // This will be passed along with all the command info

    // TODO: Split on the guild config prefix instead of hard-coded tilde by getting the Guild from the db by guildID
    let CommandSubstring = msg.content.split('~')[1].split(' ') // Splits up a command message
    CommandStruct.command = CommandSubstring[0] // The first string in the substring array
    CommandStruct.args = CommandSubstring.slice(1, CommandSubstring.length+1) // Pass the rest of the message as args
    CommandStruct.message = msg // The message itself

    // TODO: Build Permission data into PermStruct. It should pull user data from the DB for
    // users who are minimods/mods and let them do certain things in any server that tilice is in,
    // so permissions like that will be saved to the database, and will be retrieved using memberID

    console.log(msg.member.roles.cache.hasAny(BotBuilderRole))

    PermStruct.Administrator = msg.member.permissions.has('Administrator') //msg.member.hasPermission('ADMINISTRATOR')
    PermStruct.BotManager = (
        msg.member.permissions.has('Administrator') 
        || msg.member.roles.cache.hasAny(MinimodRole) 
        || msg.member.roles.cache.hasAny(BotBuilderRole)
    )

    cb(PermStruct, CommandStruct)
}