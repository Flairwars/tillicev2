// Using an Express Router
const router = require('express').Router()

// Get a reference to the /botRoutes directory...
const normalizedPath = require('path').join(__dirname, 'botRoutes')

// For each file in the /botRoutes directory...
require('fs').readdirSync(normalizedPath).forEach(file => {
  // Splitting for ease of use
  const extentionlessFileName = file.split('.js')[0]
  // Router will use /<Filename without .js> path for the file, i.e. flairwars.com/bot/channel will send
  // requests to the router in channel.js
  router.use(`/${extentionlessFileName}`, require(`./botRoutes/${extentionlessFileName}`))
  // Let us know that the routes were initialized
  console.log(`Internal Bot API loaded ${extentionlessFileName} route`)
})

module.exports = router
