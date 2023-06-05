if(process.env.NODE_ENV === 'production'){
    module.exports = require('./buildCfg.prod')
} else {
    module.exports = require('./guildCfg.dev')
}