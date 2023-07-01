const embeds = require('../template_embeds')

module.exports.run = async (CommandStruct, PermStruct) => {
  let title
  let description
  const msg = CommandStruct.message
  const CommandSubstring = msg.content.split('~')[1].split(' ') // Splits up a command message
  const args = CommandSubstring.slice(1, CommandSubstring.length + 1)

  CommandStruct.command = CommandSubstring[0] // The first string in the substring array
  CommandStruct.args = CommandSubstring.slice(1, CommandSubstring.length + 1) // Pass the rest of the message as args

  const argText = args[0] === undefined ? '' : args[0]
  console.log(argText)

  title = ''
  description = ''

  if (argText && argText > 0 && argText < (rules.length - 1)) {
    title = `Rule ${argText}`
    description = rules[argText - 1]
  } else {
    title = 'No rule defined.'
    description = 'For a complete list of rules, head to: <#1066857730066894950>'
  }
  msg.reply({ embeds: [embeds.SendEmbed(title, description)] })
}

module.exports.helpText = 'Shows a specified rule from the #rules channel'

module.exports.Category = 'Moderating'

module.exports.RequiredPermissions = []

// excellent "temporary" solution until a better one is created via fwapi
const rules = [
  "Do not harass, discriminate, or otherwise infringe on everyones' right to enjoy the server. This includes slurs, derogatory comments, or any other words, images, or media that puts down a specific group of people. Changing or censoring slurs to try and bypass this rule is prohibited.",
  'No NSFW, gore, or malicious content, including media and/or explicit discussion of the noted content. We try to keep this server PG-13, so content should remain appropriate for all users. Malicious content includes media that contains malware, spyware, or gifs that crash discord. Please also be considerate of those with photosensitivity issues.',
  'Discussion about politics, religion, gossip about other people outside of reasonable trash talking, or any other controversial topics is prohibited. Remember the human behind the keyboard.',
  'No excess spamming with the intent to annoy or pester other users. Scripts that alter message text to take up unnecessary space, such as Zalgo, are prohibited.',
  'Please clear advertising with moderators before posting. Posting discord servers, subreddits, or other web links that are not 13+ friendly is prohibited.',
  'Please keep discussion about serious topics, life problems, and so on to the serious category. We understand sometimes you just need to talk to someone or shout at the void, however, it can also make others uncomfortable.',
  'No piracy, torrent links, or distributing copyrighted material without permission. This includes GIFs that are entire movies. Discussion about game emulation is allowed, however, posting links to emulators and game ROMs/ISOs is prohibited.',
  'Be respectful and understanding towards everyone, and avoid jokes, comments, and media that might make people feel uncomfortable or otherwise ruin their right to enjoy this server. Bashing flairwars colors is fine, bashing people is not.',
  "People will share their art and lore here. Keep commentary positive, or give constructive criticism/feedback. If you don't know how to do that, then don't comment at all. In general, just don't be a jerk.",
  'User profiles, including nicknames and profile content are subject to moderation in accordance to the rules. You will be asked to change your nickname, or have it changed to your reddit username if your nickname makes others uncomfortable.',
  'Your nickname will be set to your reddit username by default. You may change your nickname, however, your reddit username should still be in your nickname for the server. It can be in parenthesis or brackets at the end, shortened to a reasonable, recognizable word or phrase, or otherwise slightly modified to fit into the nickname field, however we are still primarily a reddit-based game, and we need to know who is who.',
  'Do not post spolers for relevant media without spoiler tags',
  "Please listen to the direction of the moderators and mini-mods. We volunteer our time to make this server a fun place for everyone. Don't make it harder please. You can disagree with mods/admins, but do it politely and constructively. We're making all sorts of battles, events, and such for free, in addition to running the discord and subreddit.",
  'We respect all cultures and languages here, but please keep conversation to English. Isolated words or phrases are fine, but if you want to have a conversation in one, move to DMs please.',
  'Puns involving cheese are strictly prohibited. That would not brie very nice of you.'
]
