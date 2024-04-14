const { REST, Routes } = require('discord.js');
require('dotenv').config()
const clientId = process.env.CLIENT_ID
const token = process.env.BOT_TOKEN
const guildId = process.env.GUILD_ID
const rest = new REST().setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);