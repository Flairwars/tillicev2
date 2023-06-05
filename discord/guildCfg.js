if(process.env.NODE_ENV === 'production'){
    module.exports = require('./guildCfg.prod')
} else {
    module.exports = require('./guildCfg.dev')
}