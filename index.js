const dotenv = require('dotenv');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const ffTypes = require('./data/types.js');

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', (client) => {
	console.log(`Ready to work.\nClient ID ${client.user.id}`);
	client.guilds.cache.forEach( (guild, guildID, _ ) => {
		console.log(`Connected to guild "${guild.name}" of ID ${guildID}`);
	});
});

// Read commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Register interactions to match with button interactions
client.registeredInteraction = {};
client.registerInteraction = function(interaction) {
	client.registeredInteraction[`${interaction.id}`] = interaction;
}

// Answer commands
client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) 
		manageCommand(interaction);
	else if(interaction.isButton())
		manageButton(interaction);

});

async function manageCommand(commandInteraction) {
	const command = client.commands.get(commandInteraction.commandName);

	if (!command) return;

	try {
		await command.execute(client, commandInteraction);
        client.registerInteraction(commandInteraction);
	} catch (error) {
		console.error(error);
		const answer = { content: 'There was an error while executing this command.', ephemeral: true };
		if (commandInteraction.deferred || commandInteraction.replied)
			await commandInteraction.editReply(answer);
		else
			await commandInteraction.reply(answer);
	}
}

async function manageButton(buttonInteraction) {
	const interactionId = buttonInteraction.customId.split("-")[0];
	if( !interactionId ) return;
	
	const commandInteraction = client.registeredInteraction[interactionId];
	if (!commandInteraction) {
		await buttonInteraction.reply({ content: 'This message is too old, I can no longer edit it.', ephemeral: true });
		return;
	}

	try {
		await commandInteraction.reactToButton(client, buttonInteraction);
        await buttonInteraction.deferUpdate();
	} catch (error) {
		console.error(error);
		const answer = { content: 'There was an error while treating this button press.', ephemeral: true };
		if (buttonInteraction.deferred || buttonInteraction.replied)
			await buttonInteraction.editReply(answer);
		else
			await buttonInteraction.reply(answer);
	}
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
