const { SlashCommandBuilder } = require('@discordjs/builders');
const database = require('../struct/database.js');
const db = new database();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist a user from creating Invites!')
        .addStringOption(option => option.setName('user_id').setDescription('The user to blacklist').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for blacklisting').setRequired(true)),
    async execute(interaction) {
        const string = interaction.options.getString('user_id');
        const blacklistReason = interaction.options.getString('reason')
        db.insertBlacklist('discord_bot_mim3','blacklisted',{userId:string,reason:blacklistReason})
        await interaction.reply(`User ${string} has been blacklisted! Reason: ${blacklistReason}`);
    }
}