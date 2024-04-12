const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const database = require('../struct/database.js');
const getUser = require('../struct/getUser.js');
const db = new database();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkblacklist')
        .setDescription('Check all blacklisted users'),
    async execute(interaction) {
        db.getAllDocuments('discord_bot_mim3', 'blacklisted').then(async result => {
            const itemsPerPage = 5;
            const totalPages = Math.ceil(result.length / itemsPerPage);
            let currentPage = 0;
            async function generatePageContent(page,result) {
                const slicedResult = result.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                const bLUser = []
                await Promise.all(slicedResult.map(async (user)=> {
                    await getUser(user.userId)
                    .then(u => {

                        bLUser.push(JSON.parse(`{"name": "User: ${u.username}", "value": "Reason: ${user.reason} userID: ${u.id}"}`));
                    }).catch(err => {
                        bLUser.push(JSON.parse(`{"name": "User: ${err.rawError.message}", "value": "Reason: ${user.reason} userID: ${user.userId}"}`));
                    })
                }))
                embed = {
                    title: 'Blacklisted Users',
                    fields : bLUser,
                    footer: { text: `Page ${page + 1} of ${totalPages}` }
                }
                return embed;
            }
            await interaction.reply({ embeds: [await generatePageContent(currentPage,result)] })
                .then(async () => {
                    const message = await interaction.channel.messages.fetch(interaction.channel.lastMessageId)
                    if (totalPages > 1) {
                        await message.react('⬅️');
                        await message.react('➡️');
                    }
                    const filter = (reaction, user) => {
                        return reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️' && user.id === interaction.user.id;
                    }
                    
                    const collector = message.createReactionCollector({ filter, time: 60_000 });
                    collector.on('collect', async(reaction, user) => {
                        // Handle pagination based on the reaction
                        if (reaction.emoji.name === '⬅️' && currentPage > 0) {
                            currentPage--;
                            console.log(`Current page: ${currentPage}`);
                        } else if (reaction.emoji.name === '➡️' && currentPage < totalPages - 1) {
                            currentPage++;
                            console.log(`Current page: ${currentPage}`);
                        }

                        // Update the message with the new page
                        message.edit({ embeds: [await generatePageContent(currentPage,result)] });
                        
                    });
                    collector.on('end', () => {
                        message.reactions.removeAll();
                    })
                 })
        })
    }
}