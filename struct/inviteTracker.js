const { GuildInviteManager } = require("discord.js");
const fs = require("fs");
class inviteTracker{
    constructor(){
        this.invites = [];
    }
    checkInvites(inviteCode){

    }
    checkAllInvite(client){
        const guildInvites = new Map()
        client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.invites.fetch()))

        client.on('ready', () => {
            client.guilds.cache.forEach(guild => {
                guild.invites.fetch().then(invitee =>{
                    //fs.writeFileSync('invite.json', JSON.stringify(invitee))
                    invitee.forEach(invite => {  
                        //insert on db also duplicate will not be inserted
                        console.log(invite.code,invite.inviterId)
                    })
                })
            })
        })
        
    }
    blacklistInvite(userId){
        //insert userId on blacklisted table on DB
    }
    whitelistInvite(userId){
        //insert userId on whitelisted table on DB
    }
    checkIfBlacklisted(inviteCode,userId){
        //add checker if blacklisted or whitelisted
        client.on('ready', () => {
            client.users.fetch(userId).then(dm => {
             dm.send(`Your invite ${inviteCode} has been deleted!`);
             dm.send(`You are blacklisted from creating invites!`);
         })
         })
    }
}
module.exports = inviteTracker;