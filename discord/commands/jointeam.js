/** This is a test command to show what command files should look like */
const Discord = require("discord.js");

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = async (CommandStruct, PermStruct) => {
  await CommandStruct.message.guild.roles.fetch()
  const teamRoles = ["Single Slash", "Double Slash", "No Slash"];
  const teamPrefixes = ["u/", "/u/", ""];
  const client = require('../init').Client;
  let guild = client.guilds.cache.get('463794005231271976');
  let member = guild.member(CommandStruct.message.author);
  let userNick = member ? member.displayName : null;
  let finalNick = userNick.substring(3);

  const roleCheck = CommandStruct.message.member.roles.cache.find(role => teamRoles.includes(role.name));
  let declineEmbed = new Discord.MessageEmbed()
  .setDescription("**You have already been assigned to a team**")
  .setColor("#f21313")
  if(roleCheck) return CommandStruct.message.channel.send(declineEmbed);

  let choice = (Math.round(Math.random() * (3 - 1) + 1));
  let acceptEmbed = new Discord.MessageEmbed()
  .setDescription("**You have been assigned to:**")
  .addField(teamRoles[choice-1].toUpperCase(), "This action is irreversable")
  .setColor("#0cca00")
  CommandStruct.message.channel.send(acceptEmbed);
  let assignedRole = CommandStruct.message.guild.roles.cache.find(role => role.name === teamRoles[choice-1]);
  if(assignedRole) CommandStruct.message.member.roles.add(assignedRole.id);
  CommandStruct.message.member.setNickname(teamPrefixes[choice-1] + finalNick);
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Used to randomly assign a user to a battle 33 team`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Misc`

module.exports.RequiredPermissions = []