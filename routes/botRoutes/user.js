const router = require('express').Router()

const botClient = require('../../discord/init').Client

const guildCfg = require('../../discord/guildCfg')

router.put('/:userId', (req, res) => {
  if (req.body.hasOwnProperty('color') && req.body.hasOwnProperty('nickname')) {
    const thisGuild = botClient.guilds.cache.get(guildCfg.GuildInfo.GuildID)
    const noRole = thisGuild.roles.cache.get(guildCfg.GuildInfo.noRoleID)
    const ColorRole = thisGuild.roles.cache.get(guildCfg.GuildInfo[req.body.color].role)
    const ColorChannel = thisGuild.channels.cache.get(guildCfg.GuildInfo[req.body.color].channel)
    const modifiedUser = thisGuild.members.cache.get(req.params.userId)

    modifiedUser.roles.add(ColorRole).catch(console.error).then(modifiedUser.roles.remove(noRole).catch(console.error))
    modifiedUser.setNickname(`/u/${req.body.nickname}`).catch(console.error)
    ColorChannel.send(`Welcome to ${req.body.color}, <@${req.params.userId}>\n<@&574972919365632010>`)
  }
})

module.exports = router
