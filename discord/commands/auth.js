// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = (CommandStruct, PermStruct) => {
    // TODO: Try finding a user in the database and use that data first before sending a reddit link

    const redirect_uri = 'https://flairwars.com/auth/reddit/callback'
    // State is a base64 encoded string of user ID
    const state = Buffer.from(CommandStruct.message.member.id).toString('base64')
    let RedditAuthUri = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENTID}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&scope=identity`

    CommandStruct.message.member.send(`Hi! Please log in with Reddit so we can verify\n${RedditAuthUri}`)
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Log in with Reddit to get your Flairwars Color`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Administration`