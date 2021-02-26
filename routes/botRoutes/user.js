const router = require('express').Router()

const botClient = require('../../discord/init').Client

const GuildInfo = {
    'GuildID': '463794005231271976',
    'red': {
        role: '463796585738928128',
        channel: '463802779006402560'
    },
    'orange': {
        role: '463796993047920642',
        channel: '463804140259246080'
    },
    'yellow': {
        role: '463797165643530260',
        channel: '463807168018251813'
    },
    'green': {
        role: '463797511681736705',
        channel: '463811712391577622'
    },
    'blue': {
        role: '463797611783258123',
        channel: '463812439927160842'
    },
    'purple': {
        role: '463797860723326976',
        channel: '463812871458127883'
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