const router = require('express').Router()

const botClient = require('../../discord/init').Client

// MEGASERVER INFO
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

// DEBUG GUILD INFO
// const GuildInfo = {
//     'GuildID': '809491629207191572',
//     'red': {
//         role: '810299762523373589',
//         channel: '810960352678117396'
//     },
//     'orange': {
//         role: '810473397355282462',
//         channel: '810960375376773121'
//     },
//     'yellow': {
//         role: '810473414539608064',
//         channel: '810960401469931520'
//     },
//     'green': {
//         role: '810953212747317308',
//         channel: '810960420478517278'
//     },
//     'blue': {
//         role: '810953813334818836',
//         channel: '810960435742375976'
//     },
//     'purple': {
//         role: '810953814072229900',
//         channel: '810960452090593340'
//     }
// }

router.put('/:userId', (req, res) => {
    if (req.body.hasOwnProperty('color') && req.body.hasOwnProperty('nickname')) {
        let thisGuild = botClient.guilds.cache.get(GuildInfo.GuildID)
        let ColorRole = thisGuild.roles.cache.get(GuildInfo[req.body.color].role)
        let ColorChannel = thisGuild.channels.cache.get(GuildInfo[req.body.color].channel)
        let modifiedUser = thisGuild.members.cache.get(req.params.userId)

        modifiedUser.roles.add(ColorRole).catch(console.error)
        modifiedUser.setNickname(`/u/${req.body.nickname}`).catch(console.error)
        ColorChannel.send(`Welcome to ${req.body.color}, <@${req.params.userId}>\n<@&574972919365632010>`)
    }
})

module.exports = router
