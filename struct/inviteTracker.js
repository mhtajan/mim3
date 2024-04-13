const { GuildInviteManager } = require("discord.js");
const database = require("./database.js");
const db = new database();
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
                    invitee.forEach(invite => {  
                        db.insertDocument('discord_bot_mim3','invites',invite)
                    })
                })
            })
        })
    }
    blacklistInvite(userId,reason){
        db.insertDocument('discord_bot_mim3','blacklisted',{userId:userId,reason:reason})
    }
    whitelistInvite(userId){
        db.whiteList('discord_bot_mim3','blacklisted',{userId:userId})
    }
    checkIfBlacklisted(inviteCode,userId){
        db.getDocument('discord_bot_mim3','blacklisted',{code:inviteCode}).then(result => {
            if(result){
                return true;
            }
            else{
                return false;
            }
        })
    }
}
module.exports = inviteTracker;