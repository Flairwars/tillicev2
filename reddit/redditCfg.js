if (process.env.NODE_ENV === 'production') {
  module.exports = require('./redditCfg.prod')
} else {
  module.exports = require('./redditCfg.dev')
}
