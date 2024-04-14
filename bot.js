const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config()
const presence = require('./presence.json')
module.exports = (() => {
    const client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.DirectMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildInvites
        ],
      });

    client.login(process.env.BOT_TOKEN);
  //   client.on('ready', () => {
  //     client.user.setPresence(presence);
  // })
    return client;
})();
