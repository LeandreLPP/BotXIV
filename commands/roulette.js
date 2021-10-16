const { SlashCommandBuilder } = require("@discordjs/builders");
const { Roulettes, Jobs } = require("../data/types.js");

function emojiString(id, interaction) {
    var ret = `:${id}:`;

    interaction.guild.emojis.cache.forEach(emoji => {
        if(emoji.name === id)  {
            ret = `<:${emoji.name}:${emoji.id}>`;
        }
    });
    
    return ret;
}

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

        interaction.roulette = Roulettes[type];
        if( interaction.roulette === null ) {
            await interaction.reply({ content: 'The roulette type selected is not recognised!', ephemeral: true });
            return;
        }

		await interaction.deferReply();

        interaction.rolesNeeded = [...interaction.roulette.roles];
        if( number === null || number > interaction.rolesNeeded.length )
            number = interaction.rolesNeeded.length;

        interaction.chosenJobs = [];
        for(var i = 0; i < number; i++) {
            const chosenIndex =  Math.floor(Math.random() * interaction.rolesNeeded.length);
            const chosenRole = interaction.rolesNeeded.splice(chosenIndex, 1);
            const relevantJobs = Jobs.filter( job => job.role === chosenRole[0] );

            interaction.chosenJobs.push(relevantJobs[ Math.floor(Math.random() * relevantJobs.length) ]);
        }

        var answer = `For this "${interaction.roulette.description}" roulette, I suggest that you use the following jobs:`;
        interaction.chosenJobs.forEach((job, index) => {
            answer += `\n - Player ${index + 1}: ${emojiString(job.id, interaction)} ${job.name}`;
        });

        await interaction.editReply(answer);
    },
};
