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
    let bannedWords = ["serious", "nsfw", "sex", "cum", "masturbate", "porn", "nigger", "kike", "spic", "zipperhead", "faggot", "chink", "retard", "dago", "tranny", "paki", "erection"]
    do {
        const post = await RedditClient.getSubreddit(Subreddit).getRandomSubmission();
        const allowed = post.post_hint != 'image' && !post.over_18 && bannedWords.some( word => { ! post.data.title.toLowerCase().includes(word) } ) && post.data.title.length <= 256
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
        let guildNickMatch = msg.guild.members.cache
            .filter(m => m.nickname)
            .find(m => m.nickname.toLowerCase().includes(CommandStruct.args[0].toLowerCase()))
        member = guildNickMatch;

        // If there's still no member that was found
        if (!member) {
            // Find a fitting Discurd user name
            let discordUsernameMatch = msg.guild.members.cache.find(m => m.user.username.toLowerCase().includes(CommandStruct.args[0].toLowerCase()));

            member = discordUsernameMatch;

            // If there is still no member
            if (!member) {
                return null;
            }
        }
    }

    return member;

}

module.exports.getNormalTopic = async () => {
    let replies = [
            "What is the best thing about your colour?",
            "What is the current colour ranking right now in your opinion, and why?",
            "What's your earliest memory of Flairwars?",
            "What has been your favourite moment of Flairwars so far?",
            "If you couldn't be your current color, which color would you want to be - and why?",
            "What was your favorite Battle?",
            "If you could trade one of your color members for another color member, who would you trade and who would you ask for?",
            "Which fun category channel is your favorite and why?",
            "Which alliance was your favorite?",
            "What alliance had the lamest name?",
            "What is the best Flairwars related OC you can remember?",
            "If you could select one person from Flairwars to be stranded with on an abandoned isle, who would it be and why?",
            "Should the bees be captured or freed?",
            "Outside of Flairwars, what is your favorite color?",
            "How could Flairwars be improved?",
            "If you could make one change to Flairwars, what would you do?",
            "What color did you want to be before you were assigned?",
            "If you were a mod, what would be the first thing you'd do?",
            "If you splintered, what would be the splinter name and why would you splinter from your colour?",
            "If you weren't your Flairwars color, what Flairwars color would you be the happiest to be?",
            "What is the one thing that doesn't have your colour by default, but would be much better if it did - and why?",
            "What is a lore aspect of a color other than your own that you like?",
            "What is the one thing you admire about Red?",
            "What is one thing you admire about Orange?",
            "What is one thing you admire about Yellow?",
            "What is one thing you admire about Green?",
            "What is one thing you admire about Blue?",
            "What is one thing you admire about Purple?",
            "What has been your favorite Flairwars splinter group and why?",
            "What made you stay in Flairwars?",
            "What's a funny story about the Flair Wars you want to tell?",
            "What is the single event when you had the most fun in Flairwars?",
            "If you could make one Megaserver channel, what would it be?",
            "What is your favorite channel and why?",
            "If you were a Mod for a day, what would you do?",
            "What color do you enjoy fighting the most?",
            "What animal best represents your color?",
            "What is your favorite colour hue of your colour?",
            "What is your favorite colour hue of a colour different than yours?",
            "If Flairwars was to assign teams based on something other than color, what would the teams be?",
            "How did you discover Flairwars?",
            "What is your second favorite Flairwars color?",
            "Who is your favorite newer member of Flairwars?",
            "What are your top two most used emotes?",
            "What is your favorite emote?",
            "What color has changed the most in the past month?",
            "What is the best Flairwars-related conversation you've had?",
            "What's the best Flairwars meme?",
            "What should we as a community work on fixing next?",
            "You are forced to remove one colour. Which colour will it be and why?",
            "What's one thing that you think your color could improve on?",
            "Who's the first person on Flairwars you really talked to?",
            "What would change if Flairwars had a million members?",
            "Where were you before you joined Flairwars?",
            "What if everyone except the FW people disappeared from the earth?",
            "What's your favorite bot?",
            "What do you like the most about Flairwars and why?",
            "What was your favourite era in Flairwars and why?",
            "If you were to add a 7th colour to flairwars, which colour would it be and why?",
            "What is the best thing about your colour and why?",
            "What is the least funny FW meme and why?",
            "If Flaiwars lore was real, which colour would you want to live in?",
            "What was the last movie you saw?",
            "What is the last song you listened to?",
            "Roast the person above you in chat",
            "What is your favorite music genre?",
            "What was your favourite moment from yesterday?",
            "If you could learn any musical instrument, what would it be?",
            "What's the best part about your day?",
            "What are you proud of, but never get the chance to talk about?",
            "Would you rather take a cold shower on a hot summer day, or be wrapped in a warm blanket on a cold winter day?",
            "Do you have any hobbies that could be considered strange?",
            "What has been your favorite battle?",
            "If you could see into the inner workings and chats of one color, which color would you want to look into and why?",
            "What country has the best flag?",
            "What country has the best name?",
            "If you could create one universal law, what would it be and why?",
            "You're allowed to add one new word to the dictonary. What is it and what does it mean?",
            "You're allowed to remove one word from the dictonary and everyone's memory. What word do you choose and why?",
            "What's your biggest strength?",
            "What are Flairwars' unwritten rules?",
            "What do you wish you weren't expected to do?",
            "Wats or dogs? Why?",
            "If you could live with any member of Flairwars for one day, who would it be and why?",
            "What is the weirdest (SFW) thing you've eaten or seen someone eat?",
            "Where is somewhere everyone seems to want to that you really don't or that really sucks, and why do you disagree?",
            "If you were one of the last two humans alive on Earth, how would you find the other person?",
            "What the worst thing you've ever done that you don't regret?",
            "If you were a character from a game, what would you be like?",
            "What's the worst place you've ever traveled to?",
            "How is your week going?",
            "What is the most overrated thing you can think of?",
            "What memory is most prominent from the 2010s?",
            "If you had to permanently move to another country, which would it be and why?",
            "What's a random fact about your country or city?",
            "What YouTubers do you enjoy the most?",
            "What innovations are underappreciated?",
            "What level of toastiness do you like your toast?",
            "What is the worst reply to \"Will you marry me?\"",
            "What would be your last meal?",
            "What is one thing you are proud of that you did this week, big or small?",
            "If you had a boat, what would you name it?",
            "What's the most overrated food?",
            "If you had a boat, what would you name it?",
            "What are the three best qualities of yourself?",
            "What's something you needlessly overthink?",
            "What's something you've learnt from videogames?",
            "Where is somewhere you would love to travel to and why?",
            "If you could live in a fictional universe, which one and why?",
            "Which Hogwarts house would you be in?",
            "Which kind of fish is best?",
            "Guess what?",
            "What?",
            "Chicken Butt",
            "What is the worst meme that people find funny?",
            "What are you proud of, but never get the chance to talk about?",
            "What is your favourite all-time meme and why?",
            "Which superpower would suck to have in reality?",
            "If you could learn any musical instrument, what would it be and why?",
            "If you could intervene during any historic event, changing history, what would it be and why?",
            "What's been your favourite moment from the past few days and why?",
            "What's your favourite videogame?",
            "What's your favourite book?",
            "What's your favourite TV Show/Movie/Anime/etc?",
            "How are you?",
            "What are some of your hobbies other than Flairwars?",
            "What was the last thing you made with your hands?",
            "What is the best (SFW) joke that you know?",
            "If you could mash up two superheroes to make a new, more powerful one, who would it be and why?",
            "What is one of your current biggest wishes?",
            "How did you get your Reddit name?",
            "What's the nicest compliment anyone has ever told you?",
            "What's the last book you read? Did you like it?",
            "If you could do anything without consequences, what would it be?",
            "What's something you want others to know about you?",
            "What is a fun fact (that very few to no people on Flairwars know) about yourself?",
            "Do you have any goals at the moment, in real life or Flairwars?",
            "What stereotype fits you perfectly and you're 100% okay with it?",
            "What is your biggest flaw?",
            "What's something you're excited about?",
            "What's something you're anxious about?",
            "What did you wish more people knew?",
            "What's the worst `~topic` topic, and why?",
            "What's the most outdated thing you still use today?",
            "What do you like/dislike about snakes?",
            "What's something you wish Oil would do?",
            "If you could have one superpower, what would it be and why?",
            "What song has been your most recent addiction?",
            "What things remind you of your childhood the most (movies, songs, food, etc.)?",
            "What's an unusual talent of yours?",
            "What type of music are you into?",
            "What has been your favorite vacation spot?",
            "If you won the lottery (750 million in this case), what would you spend it on?",
            "If you were to live your next life as an animal, what animal would it be?",
            "If you could re-live/live through any event before 2000, what would it be?",
            "Is your online personality different from your personality in person? How so?",
            "What's the most memorable thing that's happened in the last month?",
            "Do you mostly use a PC, phone, or laptop, and why?",
            "Who is your favorite historical figure?",
            "You are forced to live in the past, before 1900 - when and where do you go?",
            "You are stuck on an uninhabited island in the biome of your choosing. What 3 items do you bring with you?",
            "What music have you recently listened to?",
            "If you could have any animal as a pet, what would it be?",
            "What was your first conscious thought in the morning?",
            "What is the most underrated thing you know?",
            "What's the most recent song you can't stop listening to?",
            "What was your dream job when you were younger?",
            "What is the last good song you discovered?",
            "What's your favorite book or book series?",
            "What kind of videos do you watch on YouTube?",
            "How would your life be different if you had 4 hands?",
            "What's something you didn't expect would be so hard to buy?",
            "Where is somewhere you would love to travel to and why?",
            "What is your favourite subreddit (excluding FW related subs)?",
            "How are you?",
            "What is some slang, or an inside joke, that is specific to you?",
            "What is something you assumed everyone had as a kid, that you were surprised to find out they did not?",
            "What's the best thing about the person above you in chat?",
            "The last song you listened to will be played at your funeral. How suitable or unsuitable is it?",
            "What's the scariest thing you've ever experienced while home alone?",
            "What helpful studying trick you use?",
            "What's something you're looking forward to in the next couple of months?",
            "What's something embarrassing you've done in the past that you now laugh about?",
            "What the worst thing you've ever done that you don't regret?",
            "If you could bring 1 person from history to the present day, who would you pick, and why?",
            "What's something you find extremely hard to dislike?",
            "If flairwars was an MMO, what class would each color be?",
            "What is your favorite FlairWars legend?",
            "What is the weirdest conspiracy theory you've ever heard?",
            "What's a story you want to tell?",
            "What small content creator do you think needs more attention?",
            "Like Thor does with his hammer, what item would you like to summon at your side from anywhere?",
            "What loot would you drop in a video game?",
            "If you were flairdictator, what would you do?",
            "What is the weirdest fact?",
            "What's a great quote?",
            "What makes you genuinely the happiest?",
            "And the award for `[blank]` goes to `[blank]`!!!",
            "How would your live be different if you could fly?",
            "If you could bring any fictional character into the real world, who would it be and why?",
            "If you could meet anyone from Flairwars in real life, who would it be and why?",
            " If you could have any job, (regardless of training), which job would you like any why?",
            "What has been your favourite Flairwars battle so far and why?",
            "What's your biggest pet peeve and why?",
            "If I gave you a million dollars, what would you spend it on and why?",
            "Whats your favourite song?",
            "What's your favourite food?",
            "What's your favourite video game?",
            "What's your favourite movie?",
            "What is the favourite thing about the country you live in and why?",
            "Other than Flairwars, what are some other niche subreddits or other online activities that you enjoy?",
            "Whats your favourite thing about other colours and why?",
            "If you could acquire 1 skill to a high level, (language, sport, drawing, etc), what skill would you choose and why?",
            "What obscure topic do you know a lot about?",
            "What's one physical thing you can do that's unusual or strange?",
            "Who is your favourite Internet personality and why (eg: YouTube, streamer, etc)",
            "What tourist attraction have you been to that was disappointing/not worth the hype and why?",
            "Does pineapple belong on pizza?",
            "If you had a dream planet, what would it look like?",
            "Is a hotdog a sandwich?",
            "What's something you're proud of?",
            "What's something obscure you're interested in?",
            "Are you a pessimist or an optimist?",
            "What's a secret you really want to tell? :eyes:",
            "Which season is best?",
            "What would be your last meal?"
        ]
    let result = Math.floor((Math.random() * replies.length))
    return replies[result]
}
