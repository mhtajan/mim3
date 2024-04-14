const { SlashCommandBuilder } = require('@discordjs/builders');
const database = require('../struct/database.js');
const paginatedEmbed = require('../modules/paginatedEmbed.js')
const db = new database();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkinvites')
        .setDescription('Check all Invites'),
    async execute(interaction) {
        db.getAllDocuments('discord_bot_mim3', 'invites').then(async result => {
            const itemsPerPage = 5;
            const totalPages = Math.ceil(result.length / itemsPerPage);
            let currentPage = 0;
            await interaction.reply({ embeds: [await paginatedEmbed.invitesEmbed_(currentPage,itemsPerPage,result,totalPages)] })
                .then(async () => {
                    const callbackFnc = paginatedEmbed.invitesEmbed_
                    await paginatedEmbed.embedReactionCollector(interaction,itemsPerPage,totalPages,callbackFnc,result)
                 })
        })
    }
}