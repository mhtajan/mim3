const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config()

module.exports = (() => {
    const client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.DirectMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMessageReactions
        ],
      });

    client.login(process.env.BOT_TOKEN);
    
    return client;
})();
