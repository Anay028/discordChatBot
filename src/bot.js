console.log("Loading bot");
require('dotenv').config()
const chatBot = require("./chatbot.js")
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js')
client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]})
token = process.env['token']
client.once(Events.ClientReady, c => console.log(`Loaded! Logged in as ${c.user.tag}!`))
const fs = require('node:fs');
const path = require('node:path');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
if(!token){
throw Error("No token in .env")
}
client.on(Events.MessageCreate, async message => {
    // Message = djs Object
    // msg = msg to reply returned from api
    if (!message.channel.name.includes('chatbot') || message.author.bot || message.content.startsWith("b!") ){
        return; 
    }

    message.channel.sendTyping()
    let {content} = message
    msg = await chatBot(content, message.author.id)
    message.reply({content: msg})
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);

		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		} 
    })

client.login(process.env['token'])