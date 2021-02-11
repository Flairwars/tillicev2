/** This file builds structs for use in the Discord Bot simplifying how permissions and commands
 * are parsed
 */


module.exports = (msg, guildID, memberID, cb) => {
    const PermStruct = {} // This will be passed along with all permission info
    const CommandStruct = {} // This will be passed along with all the command info

    // TODO: Split on the guild config prefix instead of hard-coded tilde by getting the Guild from the db by guildID
    let CommandSubstring = msg.content.split('~')[1].split(' ') // Splits up a command message
    CommandStruct.command = CommandSubstring[0] // The first string in the substring array
    CommandStruct.args = CommandSubstring.slice(1, CommandSubstring.length+1) // Pass the rest of the message as args
    CommandStruct.channelID = msg.channel.id // The ID of the channel that the channel was used in

    // TODO: Build Permission data into PermStruct. It should pull user data from the DB for
    // users who are minimods/mods and let them do certain things in any server that tilice is in,
    // so permissions like that will be saved to the database, and will be retrieved using memberID

    cb(PermStruct, CommandStruct)
}