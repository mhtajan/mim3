const { GuildInviteManager } = require("discord.js");
const fs = require("fs");
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
                    //fs.writeFileSync('invite.json', JSON.stringify(invitee))
                    invitee.forEach(invite => {  
                        //console.log(invite)
                        //insert on db also duplicate will not be inserted
                        db.insertDocument('discord_bot_mim3','invites',invite)
                        //console.log(invite.code,invite.inviterId)
                    })
                })
            })
        })
        
    }
    blacklistInvite(userId,reason){
        //insert userId on blacklisted table on DB
        db.insertDocument('discord_bot_mim3','blacklisted',{userId:userId,reason:reason})
    }
    whitelistInvite(userId){
        //insert userId on whitelisted table on DB
        db.insertDocument('discord_bot_mim3','whitelisted',{userId:userId})
    }
    checkIfBlacklisted(inviteCode,userId){
        db.getDocument('discord_bot_mim3','blacklisted',{code:inviteCode}).then(result => {
            if(result){
                client.on('ready', () => {
                    client.users.fetch(userId).then(dm => {
                     dm.send(`Your invite ${inviteCode} has been deleted!`);
                     dm.send(`You are blacklisted from creating invites!`);
                 })
                 })
            }
        })
    }
}
module.exports = inviteTracker;