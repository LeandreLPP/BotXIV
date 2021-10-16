const { SlashCommandBuilder } = require("@discordjs/builders");
const { Roulettes } = require("../data/types.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Choose jobs for the selected roulette.')
        .addStringOption(option => {
            option.setName('type')
                .setDescription('The type of roulette.')
                .setRequired(true);

            Object.keys(Roulettes).forEach( (name) => {
                const roulette = Roulettes[name];
                option.addChoice(roulette.description, name);
            });
            
            return option;
        })
        .addIntegerOption(option => 
            option
                .setName('number')
                .setDescription('Number of players')
                .setRequired(false)),

    async execute(client, interaction) {
        const type = interaction.options.getString('type');
        var number = interaction.options.getInteger('number');
        if( number === null ) 
            number = 1;
        await interaction.reply(`This is a roulette command, of type "${type}", for ${number} player(s).`);
    },
};
