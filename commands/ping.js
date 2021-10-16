// import { CommandInteraction, Interaction } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    async execute(client, interaction) {
        await interaction.reply('Pong, but with dynamic execution!');
    },
};
