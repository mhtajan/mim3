const { REST, Routes } = require('discord.js');
require('dotenv').config()
const clientId = process.env.CLIENT_ID
const token = process.env.BOT_TOKEN
const rest = new REST().setToken(token);
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);