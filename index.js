require('./bot.js');
const client = require('./bot.js');
const InviteTracker = require('./struct/inviteTracker.js');
const inviteT = new InviteTracker();
inviteT.checkAllInvite(client)