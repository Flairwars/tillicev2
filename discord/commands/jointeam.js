/** This is a test command to show what command files should look like */
const Discord = require("discord.js");

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = async (CommandStruct, PermStruct) => {

  await CommandStruct.message.guild.roles.fetch()
  const teamRoles = ["single slash", "double slash", "no slash"];

  const teamPrefixes = ["u/", "/u/", ""];
  const client = require('../init').Client;
  let guild = client.guilds.cache.get('463794005231271976'); // MEGASERVER : 463794005231271976 // BOT-TESTING GUILD : 809491629207191572
  let member = guild.member(CommandStruct.message.author);
  let userNick = member ? member.displayName : null;

  teamChosen = CommandStruct.args.join(" ");
  let invalidEmbed = new Discord.MessageEmbed()
  .setDescription("**invalid selection**")
  .setColor("#f21313")
  if (!teamRoles.includes(teamChosen.toLowerCase())) return CommandStruct.message.channel.send(invalidEmbed);

  const roleCheck = CommandStruct.message.member.roles.cache.find(role => teamRoles.includes(role.name));
  let declineEmbed = new Discord.MessageEmbed()
  .setDescription("**You have already been assigned to a team**")
  .setColor("#f21313")
  if(roleCheck) return CommandStruct.message.channel.send(declineEmbed);

  let choice = 1;

  if(teamChosen.toLowerCase() == "single slash") {
    choice = 0;
  } else if (teamChosen.toLowerCase() == "double slash") {
    choice = 1;
  } else if (teamChosen.toLowerCase() == "no slash") {
    choice = 2;
  };

  let acceptEmbed = new Discord.MessageEmbed()
  .setDescription("**You have been assigned to:**")
  .addField(teamRoles[choice].toUpperCase(), "This action is irreversable")
  .setColor("#0cca00")
  CommandStruct.message.channel.send(acceptEmbed);
  let assignedRole = CommandStruct.message.guild.roles.cache.find(role => role.name === teamRoles[choice-1]);
  if(assignedRole) CommandStruct.message.member.roles.add(assignedRole.id);
  CommandStruct.message.member.setNickname(teamPrefixes[choice] + userNick);
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Allows the user to assign themself to a battle 33.5 team`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Misc`

module.exports.RequiredPermissions = []
