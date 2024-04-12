const  client  = require('../bot.js')

module.exports = async (userId) => {
    const res = await client.users.fetch(userId)
    return res;
}