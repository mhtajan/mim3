const { GuildInviteManager } = require("discord.js");

class inviteTracker{
    constructor(){
        this.invites = [];
    }
    checkInvites(inviteCode){

    }
    checkAllInvite(client){
        const guildInvites = new Map()
        client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.invites.fetch()))

        client.once('ready', () => {
            client.guilds.cache.forEach(guild => {
                guild.invites.fetch().then(invitee =>{
                    invitee.forEach(invite => {
                        console.log(invite.code,invite.inviterId)
                    })
                })
            })
        })
        
    }
}
module.exports = inviteTracker;