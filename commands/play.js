const { SlashCommandBuilder } = require('@discordjs/builders');
const MusicPlayer = require('../struct/musicplayer.js');
const player = new MusicPlayer();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music')
        .addStringOption(option => option.setName('query').setDescription('Play a song, playlist or album').setRequired(true)),
    async execute(interaction) {
        const track = interaction.options.getString('track');
        // await interaction.reply('Pong!');
        // check if track is a spotify link or a youtube link
        
    }
}