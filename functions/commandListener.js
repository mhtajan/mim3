require('../bot.js')
const client = require('../bot.js')
const {Events} = require('discord.js')
client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return
    const command = client.commands.get(interaction.commandName)
    if(!command) return
    command.execute(interaction)
})