/** This is a test command to show what command files should look like */
const Discord = require(`Discord.js`);
const client = require('../init')
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
          "pollChannelID": '811781298876055562', // Megaserver pollChannelID = 482269113389940737
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
          // const messageAuthor = message.author.name;
          // const messageAuthorPfp = message.author.iconURL;
          // const messageContent = message.description;
          // const messageTime = message.timestamp;

          console.log(message.embeds)

          let newPollEmbed = new Discord.MessageEmbed(message.embeds[0])

          if (acceptOrReject === "accept") {
            
            newPollEmbed.setColor(suggestConfig.acceptedColour);
            newPollEmbed.setColor(suggestConfig.acceptedColour);
            newPollEmbed.setFooter(`Suggestion was accepted`);
          } else {
            newPollEmbed.setColor(suggestConfig.rejectedColour);
            newPollEmbed.setColor(suggestConfig.rejectedColour);
            newPollEmbed.setFooter(`Suggestion was rejected`);
          }

          console.log(newPollEmbed)

          message.edit('', {embed: newPollEmbed}).then( msg => {
            console.log(msg)
            console.log(msg.embeds[0])
          });
          command.react('👌');
        })
      } else {
          CommandStruct.message.channel.send(acceptOrReject + " Isn't valid. Use accept or deny.")
          return;
      }
      //if a/d doesn't = a/d then they spelt it wrong so let them know

//      suggestionPollChannel.messages.fetch(suggestionsID).then(message => {
//        CommandStruct.message.embeds.forEach((embed) => {
//          const messageAuthor = embed.author.name;
//          const messageAuthorPfp = embed.author.iconURL;
//          const messageContent = embed.description;
//          const messageTime = embed.timestamp;
//
//          var newPollEmbed = new RichEmbed()
//          .setDescription(messageContent)
//          .setAuthor(messageAuthor, messageAuthorPfp)
//          .setTimestamp(messageTime)
//
//          if (acceptOrReject === "accept") {
//            newPollEmbed.setColor(suggestConfig.acceptedColour);
//            newPollEmbed.setColor(suggestConfig.acceptedColour);
//            newPollEmbed.setFooter(`Suggestion was accepted`);
//          } else {
//            newPollEmbed.setColor(suggestConfig.rejectedColour);
//            newPollEmbed.setColor(suggestConfig.rejectedColour);
//            newPollEmbed.setFooter(`Suggestion was rejected`);
//          }
//
//          message.edit(newPollEmbed);
//
//          command.react('👌');   // :ok_hand:
//        })
//      })

}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Ping, for testing`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Utility`

module.exports.RequiredPermissions = []
