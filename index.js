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

// Answer commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		const answer = { content: 'There was an error while executing this command!', ephemeral: true };
		if (interaction.deferred || interaction.replied)
			await interaction.editReply(answer);
		else
			await interaction.reply(answer);
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
