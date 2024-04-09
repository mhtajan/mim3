const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  });

client.login(process.env.BOT_TOKEN);