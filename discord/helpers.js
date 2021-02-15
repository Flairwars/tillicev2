const fetch = require('node-fetch');
const RedditClient = require('../reddit/init');

module.exports.GetCatDogImage = async (APIURL) => {
    const data = await fetch(APIURL)
    const json = await data.json()
    return json[0].url
}


module.exports.GetFoxImage = async (APIURL) => {
    const data = await fetch(APIURL)
    const json = await data.json()
    return json.image
}

module.exports.GetJoke = async (APIURL) => {
    var headers = {
        "Accept": "application/json",
        "User-Agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
    }
    const data = await fetch(APIURL, {headers: headers})
    const json = await data.json()
    return json.joke
}

module.exports.getRandomRedditImage = async (Subreddit) => {
    //fetches random image off of specified subreddit
    const attempsLimit = 16;
    let attempts = 0;
    do {
        const post = await RedditClient.getSubreddit(Subreddit).getRandomSubmission();
        const allowed = post.post_hint === 'image' && !post.over_18;
        if(allowed) return post.url;
        attempts++;
    } while (attempts < attempsLimit);
    return;
}

module.exports.getRandomRedditPost = async (Subreddit) => {
    //fetches random post off of specified subreddit
    const attempsLimit = 16;
    let attempts = 0;
    do {
        const post = await RedditClient.getSubreddit(Subreddit).getRandomSubmission();
        const allowed = post.post_hint != 'image' && !post.over_18;
        if(allowed) return post.title;
        attempts++;
    } while (attempts < attempsLimit);
    return;
}

module.exports.getRandomEntry = (collection) => {
    const index = Math.floor(Math.random() * collection.length);
        return collection[index];
}

// Returns a member object of the mentioned user/by nickname/by user name in that order.
// If there are no arguments, then it returns the author.
// Returns null if nothing is found
module.exports.getGuildMemberFromCommandStruct = (CommandStruct) => {
    let msg = CommandStruct.message;
    // If there are no arguments take the author. Otherwise look for a mention
    let member = (CommandStruct.args.length === 0) ? msg.member : msg.mentions.members.first();

    // If no mention was saved in member
    if (!member) {
        // Search through all the nicknames in the guild
        guildNickMatch = msg.guild.members.cache
            .filter(m => m.nickname)
            .find(m => m.nickname.toLowerCase().includes(CommandStruct.args[0].toLowerCase()))
        member = guildNickMatch;

        // If there's still no member that was found
        if (!member) {
            // Find a fitting Discurd user name
            discordUsernameMatch = msg.guild.members.cache.find(m => m.user.username.toLowerCase().includes(CommandStruct.args[0].toLowerCase()));

            member = discordUsernameMatch;

            // If there is still no member
            if (!member) {
                return null;
            }
        }
    }

    return member;

}
