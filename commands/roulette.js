const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Roulettes, Jobs } = require("../data/types.js");

function getGuildEmoji(id, guild) {
    var ret = undefined;
    guild.emojis.cache.forEach(emoji => {
        if(emoji.name === id)
            ret = emoji;
    });
    return ret;
}

function emojiString(id, guild) {
    const emoji = getGuildEmoji(id, guild);
    return emoji === undefined ? `:${id}:` : `<:${emoji.name}:${emoji.id}>`;
}

async function reactToButton(buttonInteraction, interaction) {
    const parameters = buttonInteraction.customId.split("-");
    if(parameters[1] == 'addPlayer') {
        addPlayer(interaction);
        await updateResult(interaction);
    }
    else if( parameters[1] == 'rerollPlayer' ) {
        rerollPlayer(interaction, parameters[2]);
        await updateResult(interaction);
    }
}

async function updateResult(interaction) {
    var answer = `For this "${interaction.roulette.description}" roulette, I suggest that you use the following jobs:`;

    const buttons = [];

    interaction.chosenJobs.forEach((job, index) => {
        const emoji = getGuildEmoji(job.id, interaction.guild);
        answer += `\n - Player ${index + 1}: ${emojiString(job.id, interaction.guild)} ${job.name}`;

        var rerollButton = new MessageButton()
            .setCustomId(`${interaction.id}-rerollPlayer-${index}`)
            .setLabel(`Reroll player ${index + 1}`)
            .setStyle('SECONDARY');

        if( emoji )
            rerollButton = rerollButton.setEmoji(emoji);

        buttons.push(rerollButton);
    });

    if( interaction.rolesNeeded.length > 0  ) {
        buttons.push(new MessageButton()
            .setCustomId(`${interaction.id}-addPlayer`)
            .setLabel(`Add player`)
            .setStyle('SUCCESS')
        );
    }
    
    // Add buttons to rows
    componentRows = [new MessageActionRow().addComponents(buttons.splice(0, 4))];
    if( buttons.length > 0 )
        componentRows.push( new MessageActionRow().addComponents(buttons.splice(0, 4)) );

    interaction.reactToButton = async (_, buttonInteraction) => await reactToButton(buttonInteraction, interaction);

    await interaction.editReply({ content: answer, components: componentRows });
}

function rerollPlayer(interaction, index) {
    if( index < 0 || index >= interaction.chosenJobs.length )
        return;

    interaction.rolesNeeded.push( interaction.chosenJobs[index].role );
    interaction.chosenJobs.splice(index, 1, chooseJob(interaction));
}

function chooseJob(interaction) {
    if( interaction.rolesNeeded.length <= 0 )
        return undefined;

    const chosenIndex =  Math.floor(Math.random() * interaction.rolesNeeded.length);
    const chosenRole = interaction.rolesNeeded.splice(chosenIndex, 1);
    const relevantJobs = Jobs.filter( job => job.role === chosenRole[0] );
    return relevantJobs[ Math.floor(Math.random() * relevantJobs.length) ];
}

function addPlayer(interaction) {
    const chosenJob = chooseJob(interaction);
    if( chosenJob )
        interaction.chosenJobs.push( chosenJob );
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
        if( number === null )
            number = 1;
        else if( number > interaction.rolesNeeded.length )
            number = interaction.rolesNeeded.length;

        interaction.chosenJobs = [];
        for(var i = 0; i < number; i++) {
            addPlayer(interaction);
        }

        await updateResult(interaction);
    },
};
