require('../bot.js')
const fs = require('fs')
const client = require('../bot.js')
const path = require('node:path');
const {Collection} = require('discord.js')
client.commands = new Collection()
module.exports = (() => {
    const foldersPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
    console.log(commandFiles)
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if ('data' in command && 'execute' in command) {
           client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ./commands/${folder}/${file} is missing a required "data" or "execute" property.`);
        }
    }
})();