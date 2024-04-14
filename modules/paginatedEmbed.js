const getUser = require("../struct/getUser")
const database = require('../struct/database.js');
const db = new database();
let currPage = 0;
async function blacklistEmbed(slicedResult){
    const array = []
    await Promise.all(slicedResult.map(async (item) => {
        await getUser(item.userId).then(u => {
            array.push(JSON.parse(`{"name": "User: ${u.username}", "value": "Reason: ${item.reason} id: ${u.id}"}`));
        }).catch(err => {
            array.push(JSON.parse(`{"name": "User: ${err.rawError.message}", "value": "Reason: ${item.reason} id: ${item.userId}"}`));
        })
    }))
    return array;
}
async function blacklistEmbed_(page,pageSize,result,totalPages){
    const slicedResult = result.slice(page * pageSize, (page + 1) * pageSize)
    const res = await blacklistEmbed(slicedResult)
    console.log(page+'test')
    embed = {
        title: 'Blacklisted Users',
        fields : res,
        footer: { text: `Page ${page + 1} of ${totalPages}` }
    }
    return embed;
}
async function invitesEmbed(slicedResult){
    const array = []
    await Promise.all(slicedResult.map(async (item) => {
        console.log(item)
        const createdAt = new Date(item.createdTimestamp).toLocaleDateString();
        expiresAt = item.expiresTimestamp ? new Date(item.expiresTimestamp).toLocaleDateString() : "Never";
        await getUser(item.inviterId).then(u => {
            array.push(JSON.parse(`{"name": "${item.code} created by", "value": "${u.username}"}`));
            array.push(JSON.parse(`{"name": "Invite URL:","value": "${item.url}", "inline": true}`));
            array.push(JSON.parse(`{"name": "Created:","value": "${createdAt}", "inline": true}`));
            array.push(JSON.parse(`{"name": "Expires:","value": "${expiresAt}", "inline": true}`));
            array.push(JSON.parse(`{"name": "Temporary:","value": "${item.temporary}", "inline": false}`));
            //array.push(JSON.parse(`{"name": "Uses:","value": "${item.maxUses}", "inline": true}`));
        }).catch(err => {
            console.log(err)
        })
    }))
    return array
}
async function invitesEmbed_(page,pageSize,result,totalPages){
    const slicedResult = result.slice(pageSize * page, (page + 1) * pageSize)
    const res = await invitesEmbed(slicedResult)
    embed = {
        title: 'Invites',
        fields: res,
        footer: { text: `Page ${page + 1} of ${totalPages}` }
    }
    return embed;
}
async function embedReactionCollector(interaction,pageSize,totalPages,callbackFnc,result){
    const message = await interaction.channel.messages.fetch(interaction.channel.lastMessageId)
    if(totalPages > 1) {
        await message.react('⬅️');
        await message.react('➡️');
    }
    const filter = (reaction, user) => {
        return reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️' && user.id === interaction.user.id;
    }
    const collector = message.createReactionCollector({ filter, time: 60_000 });
    collector.on('collect', async(reaction, user) => {
        if (reaction.emoji.name === '⬅️' && currPage > 0) {
            currPage--;
            reaction.users.remove(user.id) 
        } else if (reaction.emoji.name === '➡️' && currPage < totalPages - 1) {
            currPage++;
            reaction.users.remove(user.id)          
        }
        const updatedEmbed = await callbackFnc(currPage,pageSize,result,totalPages)
        message.edit({ embeds: [updatedEmbed] });
    })
    collector.on('end', () => {
        message.reactions.removeAll();
    })
}

module.exports = {
    embedReactionCollector,
    blacklistEmbed_,
    invitesEmbed_
}