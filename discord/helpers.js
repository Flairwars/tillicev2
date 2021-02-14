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
    const attempsLimit = 20;
    let attempts = 0;
    console.log(Subreddit)
    do {
        const post = await RedditClient.getSubreddit(Subreddit).getRandomSubmission();
        const allowed = post.post_hint === 'image' && !post.over_18;
        if(allowed) return post.url;
        attempts++;
    } while (attempts < attempsLimit);
    return;
}

module.exports.getRandomEntry = (collection) => {
    const index = Math.floor(Math.random() * collection.length);
        return collection[index];
}
