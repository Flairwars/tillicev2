const router = require('express').Router()

const botClient = require('../../discord/init').Client

router.post('/:channelId', (req, res) => {
  if (req.body.hasOwnProperty('msg')) {
    botClient.channels.cache.get(req.params.channelId).send(req.body.msg)
    res.send('Sent message')
  }
})

module.exports = router
