module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message;
    var msg.mentions.members.first()
    member = member ? member : msg.member
    const snapped = (member.user.id[member.user.id.length - 1] % 2) === 0;
    
    const ImageURL = await helpers.GetFoxImage('https://randomfox.ca/floof/')
    console.log(ImageURL)
    msg.reply(embeds.SendImageEmbed(ImageURL, 'Fox'))
}

module.exports.helpText = `Snaps or spares the mentioned user`

module.exports.Category = `Fun`
