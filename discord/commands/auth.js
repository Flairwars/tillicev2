const FWAPI = require('../../api/fwapi')
const axios = require('axios')

module.exports.run = (CommandStruct, PermStruct) => {
    FWAPI.GetUserByID(CommandStruct.message.member.id).then( thisUser => {
        if (thisUser.data[0] !== undefined) {
            console.log(thisUser.data[0])
            // User was found, use that data
            if (thisUser.data.RedditUsername !== 'None') {
                userColor = thisUser.data[0].FlairwarsColor
                userRedditName = thisUser.data[0].RedditUsername

                
                console.log(`${process.env.HOSTNAME}/bot/user/${thisUser.data[0].DiscordMemberID}`)
                axios.put(`${process.env.HOSTNAME}/bot/user/${thisUser.data[0].DiscordMemberID}`, {color: userColor, nickname: userRedditName})
                    .then( success => {
                        console.log(success)
                    })
                    .catch( failure => {
                        console.error(failure)
                    })
                
            }
            else {
                // If they happen to exist but the reddit info is wrong - Can occur depending on how a user is created
                currentHost = process.env.HOSTNAME
                const redirect_uri = `${currentHost}/auth/reddit/callback`
                // State is a base64 encoded string of user ID
                const state = Buffer.from(CommandStruct.message.member.id).toString('base64')
                let RedditAuthUri = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENTID}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&scope=identity`
            
                CommandStruct.message.member.send(`Hi! Please log in with Reddit so we can verify\n${RedditAuthUri}`)
            }
        }
        else {
            // User doesn't exist in DB yet. Have them sign in again
            currentHost = process.env.HOSTNAME
            const redirect_uri = `http://${currentHost}/auth/reddit/callback`
            // State is a base64 encoded string of user ID
            const state = Buffer.from(CommandStruct.message.member.id).toString('base64')
            let RedditAuthUri = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENTID}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&scope=identity`
        
            CommandStruct.message.member.send(`Hi! Please log in with Reddit so we can verify\n${RedditAuthUri}`)
        }
    })
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Log in with Reddit to get your Flairwars Color`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Administration`