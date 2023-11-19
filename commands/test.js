const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Do i respond?'),
	async execute(interaction) {
		await interaction.reply(`yaay ${interaction.user} test complete`);
	},
};
