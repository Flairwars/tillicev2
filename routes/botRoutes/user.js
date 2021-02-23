const router = require('express').Router()

const botClient = require('../../discord/init').Client

const GuildInfo = {
    'GuildID': '809491629207191572',
    'red': {
        role: '810299762523373589',
        channel: '810960352678117396'
    },
    'orange': {
        role: '810473397355282462',
        channel: '810960375376773121'
    },
    'yellow': {
        role: '810473414539608064',
        channel: '810960401469931520'
    },
    'green': {
        role: '810953212747317308',
        channel: '810960420478517278'
    },
    'blue': {
        role: '810953813334818836',
        channel: '810960435742375976'
    },
    'purple': {
        role: '810953814072229900',
        channel: '810960452090593340'
    }
}

router.put('/:userId', (req, res) => {
    if (req.body.hasOwnProperty('color') && req.body.hasOwnProperty('nickname')) {
        let thisGuild = botClient.guilds.cache.get(GuildInfo.GuildID)
        let ColorRole = thisGuild.roles.cache.get(GuildInfo[req.body.color].role)
        let ColorChannel = thisGuild.channels.cache.get(GuildInfo[req.body.color].channel)
        let modifiedUser = thisGuild.members.cache.get(req.params.userId)

        modifiedUser.roles.add(ColorRole)
        modifiedUser.setNickname(`/u/${req.body.nickname}`)
        ColorChannel.send(`Welcome to ${req.body.color}, <@${req.params.userId}>`)
    }
})

module.exports = router