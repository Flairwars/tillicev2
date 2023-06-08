const {EmbedBuilder} = require(`discord.js`);
const perms = require('../eval_perms');

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
      //const flairwarsInfo = require('../flairwarsInfo');

      if (CommandStruct.args.length === 0) {
          CommandStruct.message.channel.send("No message found")
          return;
      }
      // if no args given

      //const suggestConfig = client.config.suggestions;
      const suggestConfig = {
          "discussionChannelID": '479768552534966286',
          "pollChannelID": '482269113389940737', // Megaserver pollChannelID = 482269113389940737
          "modPollChannelID": '531511366855688222',
          "votesToPass": 20,
          "defaultColour": "#C9DDFF",
          "defaultColourDecimal": 13229567,     // Because that's what the embeds are using internally
          "acceptedColour": "#3ACE04",
          "rejectedColour": "#AF0303",
          "inProgressColour": "#FFE500",
          "inProgressColourDecimal": 16770304
      };


      var suggestionsID = CommandStruct.args[2].toLowerCase();
      var channelID = CommandStruct.args[1].toLowerCase();
      var acceptOrReject = CommandStruct.args[0].toLowerCase();
      //divide up the accept/deny and messageID

      const command = CommandStruct.message;
      //use this instead of message in the following block to reply to command

      const suggestionPollChannel = CommandStruct.message.guild.channels.cache.get(channelID);

      if (acceptOrReject === "accept" || acceptOrReject === "deny") {
        suggestionPollChannel.messages.fetch(suggestionsID).then(message => {

          let newPollEmbed = new EmbedBuilder(message.embeds[0])

          if (acceptOrReject === "accept") {
            newPollEmbed.setColor(suggestConfig.acceptedColour);
            newPollEmbed.setFooter({text: `Suggestion was accepted`});
          } else {
            newPollEmbed.setColor(suggestConfig.rejectedColour);
            newPollEmbed.setFooter({text: `Suggestion was rejected`});
          }

          console.log(newPollEmbed)

          message.edit({embeds: [newPollEmbed]})
          command.react('👌');
        })
      } else {
          CommandStruct.message.channel.send(acceptOrReject + " Isn't valid. Use accept or deny.")
          return;
      }
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Manually evaluate a poll`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Mod`

module.exports.RequiredPermissions = [perms.levels.Admin]
