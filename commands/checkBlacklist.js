const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const database = require('../struct/database.js');
const db = new database();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkblacklist')
        .setDescription('Check all blacklisted users'),
    async execute(interaction) {
        db.getAllDocuments('discord_bot_mim3', 'blacklisted').then(async result => {
            console.log(result.slice(0, 5))
            const itemsPerPage = 5;
            const totalPages = Math.ceil(result.length / itemsPerPage);
            let currentPage = 0;
            function generatePageContent(page) {
                const embed = new EmbedBuilder()
                    .setTitle(`Page ${page + 1}`)
                    .setDescription((result.slice(page * itemsPerPage, (page + 1) * itemsPerPage)).join('\n'))
                return embed;
            }
            await interaction.reply({ embeds: [generatePageContent(currentPage)] })
                .then(async () => {
                    const message = await interaction.channel.messages.fetch(interaction.channel.lastMessageId)
                    //console.log(interaction.channel.messages)
                    if (totalPages > 1) {
                        await message.react('⬅️');
                        await message.react('➡️');
                    }
                    const filter = (reaction, user) => {
                        return reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️' && user.id === interaction.user.id;
                    }
                    
                    const collector = message.createReactionCollector({ filter, time: 15_000 });
                    collector.on('collect', (reaction, user) => {
                        // Handle pagination based on the reaction
                        if (reaction.emoji.name === '⬅️' && currentPage > 0) {
                            currentPage--;
                            console.log(`Current page: ${currentPage}`);
                        } else if (reaction.emoji.name === '➡️' && currentPage < totalPages - 1) {
                            currentPage++;
                            console.log(`Current page: ${currentPage}`);
                        }

                        // Update the message with the new page
                        message.edit({ embeds: [generatePageContent(currentPage)] });
                        
                    });
                    collector.on('end', () => {
                        message.reactions.removeAll();
                    })
                 })
        })
    }
}