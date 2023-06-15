
// Requirements
const {Discord, Client,GatewayIntentBits, Events, Partials} = require('discord.js');

// Init discord client
const client = new Client({
  // TODO: if something breaks its probably because of this 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message
  ]
});

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

// Import config
// TODO: Move this to db
const guildCfg = require('./guildCfg');

const FWApi = require('../api/fwapi')

// TODO: LOAD CONFIG FROM DB
const GuildPrefix = '~'

// For each file in the commands directory...
const fs = require('fs').readdirSync(normalizedPath).forEach( file => {
  let extensionlessFilename = file.split('.js')[0]
  // Set a member in client.CommandRegistry to the exports of a file in /commands
  client.CommandRegistry[extensionlessFilename] = require('./commands/' + file)

  // Let us know it loaded
  console.log(`Loaded command from ${file}`)
})

let SlowmodeFilter = (msg) => {
  if (guildCfg.slowmodedChannels.filter( smChannel => msg.channel.id === smChannel.id).length > 0) {
    let channel = guildCfg.slowmodedChannels.filter( smChannel => msg.channel.id === smChannel.id)[0]

    let slowmodeTimePeriod = new Date( new Date().getTime() - channel.rate*1000 )
    let slowmodeViolation = msg.channel.messages.cache.find(filteredMessages => {
      return (filteredMessages.createdAt > slowmodeTimePeriod && filteredMessages.author === msg.author)
    })

    if (slowmodeViolation && slowmodeViolation !== msg) {
      let timeRemaining = () => {
        let diff = slowmodeViolation.createdAt.getTime() - slowmodeTimePeriod.getTime()
        return `${diff/1000} seconds`
      }
      msg.author.send(`Sorry, but you sent a message in that channel recently and it's slowmoded! Here it is so you can try again in ${timeRemaining()}:\n${msg.content}`)
      msg.delete()
      return true
    }
    else return false
  }
  else return false
}

let SetPassword = (msg) => {
  let args = msg.content.split(' ').slice(1)
  if(args.length == 0){
    msg.reply("Please send a password.")
    return 
 }
 FWApi.SetPassword(msg.author.id, args.join(' '))
 .then(msg.reply('Success!'))
 .catch(e => {
     switch(e.response.status){
        // for some reason, successful requests still seem to fall through sometimes?   
        case 200:
          break
        case 500:
          msg.reply('Failed: Server error')
          break
        case 404:
          msg.reply('You have to register first by using ~auth on a server')
          break
        default:
          console.log(e)
          msg.reply('Failed: unknown error')
     }
 })
}

// Message Event Listener
client.on(Events.MessageCreate, msg => {
  // plorn reactions
  if (msg.content.toLowerCase().includes("plorn")) {
      msg.react("😳");
      msg.react("✈️");
  }

  // ping reactions
  if (msg.mentions.has(client.user)) {
      msg.react("541887773729226763");
  }

  // If the message came from a bot, ignore it.
  if(msg.author.bot) return;
  else if (!msg.inGuild()) { // The bot got a message from a DM
    // if message is the setpassword "command", do that
    if(msg.content.startsWith(`${GuildPrefix}setpassword`)){
      SetPassword(msg)
    } else {
      client.channels.cache.get(guildCfg.voidGeneral).send( // #void-general ID 485223000875204618
        {embeds: [embeds.SendEmbed(`Message from ${msg.author.username}#${msg.author.discriminator}`, msg.content)]}
      )
      
    }
  }

  else if (
    (
      !msg.member.permissionsIn(msg.channel.id).has('MANAGE_MESSAGES') ||
      !msg.member.permissions.has('ADMINISTRATOR')
    ) &&
    SlowmodeFilter(msg)
    ) {
    console.log('A message was deleted by the Slowmode Filter')
  }

  else if (msg.content.startsWith(GuildPrefix)) {
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
        let embed = embeds.GeneralHelpEmbed(ResponseStruct)
        msg.channel.send({embeds: [embeds.GeneralHelpEmbed(ResponseStruct)]})
      }
      // Specific help command issued (i.e. ~help <command name>)
      else if (CommandStruct.command === 'help' && client.CommandRegistry.hasOwnProperty(CommandStruct.args[0])) {
        // Send help message with command's help text
        msg.channel.send({
          embeds: [embeds.CommandHelpEmbed(
            CommandStruct.args[0], // The command name, as issued from ~help <command name>
            client.CommandRegistry[CommandStruct.args[0]].helpText // The helptext retrieved from its reference in the Command Registry
            )]
        })
      }
      // Otherwise...
      else {
        // See if we can run the command
        if (client.CommandRegistry.hasOwnProperty(CommandStruct.command)) {
          // If so, eval perms
          if (perms.eval(client.CommandRegistry[CommandStruct.command].RequiredPermissions, PermStruct)) {
            // User can use it, send
            console.log(`Permissions check for ${client.CommandRegistry[CommandStruct.command].RequiredPermissions.join(', ')} passed.`)
            client.CommandRegistry[CommandStruct.command].run(CommandStruct, PermStruct)
          }
          else {
            // User can't use it, error
            console.log(`Permissions check for ${client.CommandRegistry[CommandStruct.command].RequiredPermissions.join(', ')} failed.`)
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

// Set the status
client.on("ready", () => {
    client.user.setPresence({
        activity: {
            name: `for ${GuildPrefix}help`,
            type: 'WATCHING'
        },
        status: 'online'
    })
})

// Export the client so we can use it elsewhere
module.exports.Client = client
