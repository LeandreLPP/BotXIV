const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');

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

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
