
// Requirements
const Discord = require('discord.js');

// Init discord client
const client = new Discord.Client();

// Permission types and evaluation
const perms = require('./eval_perms')

// Pull in the struct builder
const buildStructs = require('./struct_builder')

// Pull in our Template Embeds
const embeds = require('./template_embeds')

// This will contain all the commands when loaded, allowing reference to them later
client.CommandRegistry = {}

// Get a path to the commands directory
const normalizedPath = require('path').join(__dirname, "commands")

// For each file in the commands directory...
const fs = require('fs').readdirSync(normalizedPath).forEach( file => {
  let extensionlessFilename = file.split('.js')[0]
  // Set a member in client.CommandRegistry to the exports of a file in /commands
  client.CommandRegistry[extensionlessFilename] = require('./commands/' + file)

  // Let us know it loaded
  console.log(`Loaded command from ${file}`)
})

// Message Event Listener
client.on('message', msg => {
  // If the message came from a bot or it's a DM, ignore it.
  if(msg.author.bot || msg.guild === null) return;

  // TODO: LOAD CONFIG FROM DB
  let GuildPrefix = '~'

  if (msg.content.startsWith(GuildPrefix)) {
    buildStructs(msg, msg.guild.id, msg.member.id, (PermStruct, CommandStruct) => {
      // If the user is trying to get help...
      console.log(`USER ${msg.member.id} Issued command ${CommandStruct.command}`)
      console.log(`ARGS Captured: ${CommandStruct.args}`)
      
      // General help command issued (i.e. ~help)
      if (CommandStruct.command === 'help' && CommandStruct.args.length === 0) {
        // Use this to temporarily store category/command name data
        let ResponseStruct = {}

        // For every command entry in the Command Registry...
        Object.keys(client.CommandRegistry).forEach(command => {
          // If a category has not yet been seen, add it to the reponse struct and initialize an empty array
          if (!ResponseStruct.hasOwnProperty(client.CommandRegistry[command].Category)) 
            ResponseStruct[client.CommandRegistry[command].Category] = []
          
          // Add the command name under the category
          ResponseStruct[client.CommandRegistry[command].Category].push(command)
        })

        // Send the General Help Embed, with categories and command names
        msg.channel.send(embeds.GeneralHelpEmbed(ResponseStruct))
      }
      // Specific help command issued (i.e. ~help <command name>)
      else if (CommandStruct.command === 'help' && client.CommandRegistry.hasOwnProperty(CommandStruct.args[0])) {
        // Send help message with command's help text
        msg.channel.send(
          embeds.CommandHelpEmbed(
            CommandStruct.args[0], // The command name, as issued from ~help <command name>
            client.CommandRegistry[CommandStruct.args[0]].helpText // The helptext retrieved from its reference in the Command Registry
            )
          )
      }
      // Otherwise...
      else {
        // See if we can run the command
        if (client.CommandRegistry.hasOwnProperty(CommandStruct.command)) {
          // If so, eval perms
          if (perms.eval(client.CommandRegistry[CommandStruct.Command].RequiredPermissions)) {
            // User can use it, send
            client.CommandRegistry[CommandStruct.command].run(CommandStruct, PermStruct)
          }
          else {
            // User can't use it, error
            msg.channel.send(embeds.SendErrorEmbed('Missing Permissions', 'You don\'t have the required permissions to do that.'))
          }
        }
        else {
          // Send some message about that command not being recognized, or do nothing
        }
      }
    })
  }

})

// Log in the bot
client.login(process.env.DISCORD_TOKEN);

// Export the client so we can use it elsewhere
module.exports.Client = client