const { SlashCommandBuilder } = require("@discordjs/builders");
const { Jobs, MaxLevel } = require("../data/types.js");
const request = require('request');

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

function getCorrespondingJob(apiJob) {
    var ret = undefined;
    Jobs.forEach(job => {
        if( job.name === apiJob.UnlockedState.Name )
            ret = job;
    });
    return ret;
}

module.exports = {
	data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Return your character jobs levels.')
        .addIntegerOption(option => 
            option.setName('id')
                .setDescription('The number ID of your character.')
                .setRequired(true)),

    async execute(client, interaction) {
        const id = interaction.options.getInteger('id');

		await interaction.deferReply();
        
        request(`https://xivapi.com/character/${id}`, function(err, response, body) {
            if(err) { 
                console.log(err); 
                errorCode = response;
                interaction.editReply({ content: `This request encountered an erro with code ${errorCode}.`, ephemeral: false });
            }

            var parsed = JSON.parse(body);
            if( parsed.Error ) {
                interaction.editReply({ content: `Could not find character of id ${id}.`, ephemeral: false });
                return;
            }
            
            var character = parsed.Character;
            var answer = `Here are leveled up jobs for ${character.Name} on ${character.Server}:`;

            character.ClassJobs.forEach(apiJob => {
                var job = getCorrespondingJob(apiJob);
                if( job === undefined || apiJob.Level <= 0 ) {
                    return;
                }
                var line = `${emojiString(job.id, interaction.guild)} ${job.name}`;
                if( apiJob.Level >= MaxLevel )
                    line = `**${line}**`;
                answer += `\n - ${line} - lvl ${apiJob.Level}`;
            });
            interaction.editReply({ content: answer, ephemeral: false });
          }
        );

    },
};
