const helpers = require('../helpers.js');
const {EmbedBuilder} = require("discord.js");
const RedditClient = require('../../reddit/init');
const fwinfo = require('../flairwarsInfo.js');

//TODO: Placeholder until the flairinfo is available somewhere else
// const flairInfo = {
//     "Red": { colourHex: "#AF0303"},

//     "Orange": { colourHex: "#F99A0C"},

//     "Yellow": { colourHex: "#FFE500"},

//     "Green": { colourHex: "#3ACE04"},

//     "Blue": { colourHex: "#213AEF"},

//     "Purple": { colourHex: "#AF0ECC"},

//     "Mod": { colourHex: "#C9DDFF"},

//     "None": { colourHex: "#C9DDFF"}
// }

// The run function should ALWAYS take CommandStruct and PermStruct
module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    let member = helpers.getGuildMemberFromCommandStruct(CommandStruct);

    if (!member) {
        await msg.channel.send(`Cannot find member with username ${CommandStruct.args[0]} on this Discord server.`);
        return;
    }

    // If the member has no nickname, then they most likely won't have a connected Reddit account yet
    // TODO: still true?
    if (!member.nickname) {
        await msg.channel.send(`User ${member.user.username} doesn't have a nickname - sending Discord info only.`)
        await msg.channel.send({embeds: [buildDiscordEmbed(member)]});
        return;
    }

    let prefixRegex = /\/?u\//;

    //TODO: Reimplement this after battle 33 to increase speed of whois
    /*
    if(!member.nickname.startsWith("/u/")) {
        await msg.channel.send(`User ${member.user.username} doesn't have a reddit based nickname - sending Discord info only.`);
        await msg.channel.send(await buildDiscordEmbed(member));
        return;
    }*/

    // Remove the reddit prefix from the nickname
    let redditName = member.nickname.split(prefixRegex).pop();

    let redditUser;

    // Try to get the redditUser object
    try {
        redditUser = await RedditClient.getUser(redditName);
        // An error isn't automatically thrown if the user doesn't exist.
        // So we are trying to access something to invoke an error.
        await redditUser.id;
    } catch (error) {
        await msg.channel.send(`This is not a valid Reddit account: https://www.reddit.com/u/${redditName}; sending Discord info only.`);
        await msg.channel.send(buildDiscordEmbed(member));
        return;
    }

    await msg.channel.send(await buildRedditEmbed(member, redditUser));
}

// This should be a string, it will be used in the detailed help command for a specific command
module.exports.helpText = `Gives information about a user.`

// This should be a string. It will be used for general help to list commands by category
module.exports.Category = `Misc`

function buildDiscordEmbed(member) {
    // Build the basis of the embed
    const embed = new EmbedBuilder()
        .setColor("#d4d4d4")
        .setTitle(member.user.tag)
        .setThumbnail(member.user.avatarURL())
        .setFooter({text: `ID: ${member.user.id}`})
        .setDescription(member.toString())

    const roles = Array.from(member.roles.cache
        .filter(role => role.id !== member.guild.id))
        .join(' ');

    embed.addFields([
        { name: "Discord account created", value: member.user.createdAt.toDateString(), inline: true},
        { name: "Joined this server", value: member.joinedAt.toDateString(), inline:true},
        { name: "Roles", value: roles ? roles : "No roles assigned"}
    ])

    return embed;
}

async function buildRedditEmbed(member, redditUser) {
    // Build the different variables needed for the Embed
    // Reddit
    // If there is an error, then the user has no flair on r/flairwars yet
    let flair;
    try {
        flair = (await RedditClient.getSubreddit('flairwars').getUserFlair(redditUser.name))
        .flair_text.split(' ')[0];
    } catch(error) {
        flair = "None"
    }

    let karma = (await redditUser.link_karma) + (await redditUser.comment_karma);

    let trophies = (await redditUser.getTrophies()).trophies;

    let accountCreated = await redditUser.created_utc
    let redditAge = new Date((accountCreated) * 1000).toDateString();

    // Discord
    const roles = member.roles.cache.array()
        .filter(role => role.id !== member.guild.id)
        .join(' ');

    // Build the basis of the embed
    const embed = new EmbedBuilder()
        .setColor(flairInfo[flair].colourHex)
        .setTitle(member.user.tag)
        .setThumbnail(member.user.avatarURL())
        .setFooter({text: `ID: ${member.user.id}`})
        .setDescription(`${member}\n[/u/${redditUser.name}](https://www.reddit.com/u/${redditUser.name})`);

    embed.addFields([
        {name: "Flair", value: flair},
        {name: "Reddit account created", value: redditAge, inline: true},
        {name: "Karma", value: karma, inline: true}
    ])

    // List the trophies if there are any available
    if (trophies.length > 0) {
        embed.addFields({name: "Trophies", value: trophies.map(trophy => trophy.name).join("\n")});
    }

    embed.addFields([
        { name: "Discord account created", value: member.user.createdAt.toDateString(), inline: true},
        { name: "Joined this server", value: member.joinedAt.toDateString(), inline:true},
        { name: "Roles", value: roles ? roles : "No roles assigned"}
    ])

    return embed;
}

module.exports.RequiredPermissions = []