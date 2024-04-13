const database = require('../struct/database.js');
const db = new database();

module.exports = ((invite) => {
    db.insertDocument('discord_bot_mim3','invites',invite)
})