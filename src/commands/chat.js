require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const chatBot = require('../chatbot.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Chat with bot')
        .addStringOption(message => message
            .setName("message")
            .setDescription("message you want to chat")
            .setRequired(true))
		.addBooleanOption(pvt => pvt
			.setName("private")
			.setDescription("Specify if only you can see this message")
			.setRequired(false)),
	async execute(interaction) {
		let message, ephemeral,  messageToReply;

		message = await interaction.options.getString("message")
		ephemeral = await interaction.options.getBoolean('private') 
		ephemeral = ephemeral ? true : false
		await interaction.deferReply({ephemeral: ephemeral})
        messageToReply = await chatBot(message, interaction.user.id)
		interaction.editReply({content: messageToReply || "It looks like the bot didn't give a reply to this query"})
	},
};