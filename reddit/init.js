const snoowrap = require('snoowrap')

// Initiate a reddit client application (Script type)
const redditClient = new snoowrap({
    userAgent: 'Tilice V2 from r/flairwars',
    clientId: process.env.REDDIT_CLIENTID,
    clientSecret: process.env.REDDIT_CLIENTSECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
})

module.exports = redditClient