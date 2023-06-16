module.exports.run = async (CommandStruct, PermStruct) => {
  const msg = CommandStruct.message
  await msg.guild.roles.fetch()
  await msg.guild.members.fetch()
  const unusedRoles = msg.guild.roles.cache.filter(role => !msg.guild.members.cache.some(member => member.roles.cache.has(role.id)))
  msg.reply(`Number of unused roles: ${unusedRoles.size}\n${unusedRoles.map(role => role.name).join('\n')}`)
}

module.exports.helpText = 'Gets all roles that are unused'

module.exports.Category = 'Mod'

module.exports.RequiredPermissions = ['Admin']
