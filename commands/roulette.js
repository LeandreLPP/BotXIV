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
        rollJobForPlayer(interaction, interaction.players[parameters[2]]);
        await updateResult(interaction);
    }
}

async function updateResult(interaction) {
    var answer = `For this "${interaction.roulette.description}" roulette, I suggest that you use the following jobs:`;

    const buttons = [];

    interaction.players.forEach((player, index) => {
        const emoji = getGuildEmoji(player.job.id, interaction.guild);
        answer += `\n - Player ${index + 1}: ${emojiString(player.job.id, interaction.guild)} ${player.job.name}`;

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

function getRelevantJobsForPlayer(interaction, player) {
    var jobTaken = interaction.players.filter(p => p !== player).map(p => p.job.id);

    // First pass avoiding duplicates
    var ret = Jobs.filter( job => interaction.rolesNeeded.includes(job.role) && 
        !player.history.includes(job.id) &&
        !jobTaken.includes(job.id) );

    // Second pass allowing duplicates
    if( ret.length === 0 )
        ret = Jobs.filter( job => interaction.rolesNeeded.includes(job.role) && !player.history.includes(job.id) );
        
    return ret;
}

function removeFirst(array, value) {
    for( var i = 0; i < array.length; i++){ 
        if ( array[i] === value) { 
            array.splice(i, 1); 
            return;
        }
    }
}

function rollJobForPlayer(interaction, player) {
    if( player.job )
        interaction.rolesNeeded.push(player.job.role);

    if( interaction.rolesNeeded.length <= 0 )
        return;

    var relevantJobs = getRelevantJobsForPlayer(interaction, player);
    if( relevantJobs.length === 0 ) {
        if( player.history.length === 0 )
            return;
        else {
            player.history = [];
            relevantJobs = getRelevantJobsForPlayer(interaction, player);
        }
    }

    player.job = relevantJobs[ Math.floor(Math.random() * relevantJobs.length) ];
    player.history.push(player.job.id);
    removeFirst(interaction.rolesNeeded, player.job.role);
}

function addPlayer(interaction) {
    if( interaction.rolesNeeded.length <= 0 )
        return;
        
    const player = {
        index: interaction.players.length,
        job: undefined,
        history: []
    };

    interaction.players.push( player );
    rollJobForPlayer(interaction, player);
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

        interaction.players = [];
        for(var i = 0; i < number; i++) {
            addPlayer(interaction);
        }

        await updateResult(interaction);
    },
};
