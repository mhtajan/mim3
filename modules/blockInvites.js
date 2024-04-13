const database = require('../struct/database.js');
const db = new database();
const deleteInvite = require('./deleteInvite.js');
const trackInvites = require('./trackInvites.js');
module.exports = ((client,invite) => {
    db.getDocument('discord_bot_mim3', 'blacklisted', { userId: invite.inviterId }).then(async (result) => {
        if(result){
            console.log('User is blacklisted')
            deleteInvite(client,invite,result.reason)
            client.users.fetch(invite.inviterId).then(user => {
                embed = {
                    title: 'Invite Deleted',
                    description: `Your invite code: [${invite.code}] has been deleted!`,
                    fields: [
                        {
                            name: 'Reason',
                            value: `${result.reason}`
                        }
                    ],
                    author:{
                        name: 'User: '+user.username,
                        iconURL: user.displayAvatarURL()
                    }
                }
                user.send({ embeds: [embed] }).catch(err => {
                    console.log(err)
                })
            })
        }
        else{
            trackInvites(invite);
            console.log('User is not blacklisted')
        }
    })
})