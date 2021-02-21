const Discord = require('discord.js');
const client = require('../init');

module.exports.run = async (CommandStruct, PermStruct) => {
    let msg = CommandStruct.message
    let total = process.uptime()
    let days = Math.floor(total / 86400)
    total %= 86400
    let hours = Math.floor(total / 3600)
    total %= 3600
    let minutes = Math.floor(total / 60)
    let seconds = Math.floor(total % 60)
    const embed = new Discord.MessageEmbed()
        .setTitle("Statistics")
        .setColor('#888888')
        .setFooter('Tilice v2')
        .addFields(
		{ name: 'Uptime', value: `${days} D ${hours} H ${minutes} M ${seconds} S` },
        { name: 'API Latency', value: `${msg.client.ws.ping}ms` },
		{ name: 'Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MiB` },
		{ name: 'Servers', value: `${client.Client.guilds.cache.size.toLocaleString()}` },
		{ name: 'Channels', value: `${client.Client.channels.cache.size.toLocaleString()}` },
        { name: 'Users', value: `${client.Client.users.cache.size.toLocaleString()}` },
        { name: 'Discord.js', value: `v${Discord.version}` },
        { name: 'Node.js', value: `${process.version}` },
        { name: 'Platform', value: `${process.platform}` })
    msg.reply(embed)
}

module.exports.helpText = `Gets statistics for the Discord bot`

module.exports.Category = `Dev`

module.exports.RequiredPermissions = []
