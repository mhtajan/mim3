require('../bot.js')
const client = require('../bot.js')
const blockInvites = require('../modules/blockInvites.js')
module.exports = (() => {
    client.on('inviteCreate', invite => {
        blockInvites(client,invite)
    })
    //client.fetchInvite()
})();