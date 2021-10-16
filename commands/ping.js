// import { CommandInteraction, Interaction } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    async execute(client, interaction) {
        const possibleAnswers = [
            `I think the correct answer to that query is "Pong", sir.`,
            `"Pong", sir.`,
            `It's a peculiar way to exchange a greeting, but if you so wish, I shall answer. Pong.`,
            `Pong.   *... I shall never understand this tradition.*`,
            `As the youngsters say... "Pong".`,
        ];
        await interaction.reply( possibleAnswers[ Math.floor(Math.random() * possibleAnswers.length) ] );
    },
};
