const { SlashCommandBuilder } = require('@discordjs/builders');
const inviteTracker = require('../struct/inviteTracker.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Whitelist a user from creating Invites!')
        .addStringOption(option => option.setName('user_id').setDescription('The user to whitelist').setRequired(true)),
    async execute(interaction) {
        const string = interaction.options.getString('user_id');
        const invT = new inviteTracker();
        invT.whitelistInvite(string)
        await interaction.reply(`User ${string} has been whitelisted!`);
    }
}