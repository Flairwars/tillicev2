const FWAPI = require('../../api/fwapi')
const axios = require('axios')

module.exports.run = (CommandStruct, PermStruct) => {
  FWAPI.GetUserByID(CommandStruct.message.member.id).then(thisUser => {
    console.log(thisUser.data)
    // User was found, use that data
    if (thisUser.data.RedditInfo.RedditUsername !== 'None') {
      const userColor = thisUser.data.RedditInfo.FlairwarsColor
      const userRedditName = thisUser.data.RedditInfo.RedditUsername

      console.log(`${process.env.HOSTNAME}/bot/user/${thisUser.data.DiscordID}`)
      axios.put(`${process.env.HOSTNAME}/bot/user/${thisUser.data.DiscordID}`, { color: userColor, nickname: userRedditName })
        .then(success => {
          console.log(success)
        })
        .catch(failure => {
          console.error(failure)
        })
    } else {
      // If they happen to exist but the reddit info is wrong - Can occur depending on how a user is created
      const currentHost = process.env.HOSTNAME
      const redirectUri = `${currentHost}/auth/reddit/callback`
      // State is a base64 encoded string of user ID
      const state = Buffer.from(CommandStruct.message.member.id).toString('base64')
      const RedditAuthUri = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_OAUTH_CLIENTID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=identity`

      // Attempt to DM the authorising user
      try {
        // TODO: this should ping the user
        CommandStruct.message.member.send(`Hi! Please log in with Reddit so we can verify\n${RedditAuthUri}`).then(CommandStruct.message.reply('Check your DMs!'))
      } catch (e) {
        console.log(e)
        CommandStruct.message.reply('I tried to send you a DM, but I had a problem trying to do so. Please check if "Enable DMs from this server" is enabled, then try again. If the issue persists, please ping a moderator and ask to be authorised manually!')
      }
    }
  }
  )
    .catch(e => {
      if (e.response.status === 404) {
        // User doesn't exist in DB yet. Have them sign in again
        const currentHost = process.env.HOSTNAME
        const redirectUri = `${currentHost}/auth/reddit/callback`
        // State is a base64 encoded string of user ID
        const state = Buffer.from(CommandStruct.message.member.id).toString('base64')
        const RedditAuthUri = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_OAUTH_CLIENTID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=identity`

        try {
          CommandStruct.message.member.createDM().then(dm => {
            // TODO: this should ping the user
            dm.send(`Hi! Please log in with Reddit so we can verify\n${RedditAuthUri}`).then(CommandStruct.message.reply('Check your DMs!'))
          })
        } catch (e) {
          console.log(e)
          CommandStruct.message.channel.send('I tried to send you a DM, but I had a problem trying to do so. Please check if "Enable DMs from this server" is enabled, then try again. If the issue persists, please ping a moderator and ask to be authorised manually!')
        }
      } else {
        console.log(e)
      }
    })
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = 'Log in with Reddit to get your Flairwars Color'

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = 'Mod'

module.exports.RequiredPermissions = []
