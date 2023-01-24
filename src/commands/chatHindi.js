const translate = require('../translate.js')
require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const chatBot = require('../chatbot.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chathindi')
		.setDescription('Chat with bot in hindi(Response in english)(invalid message = invalid results)')
        .addStringOption(message => message
            .setName("message")
            .setDescription("message you want to chat")
            .setRequired(true))
		.addBooleanOption(pvt => pvt
			.setName("private")
			.setDescription("Specify if only you can see this message")
			.setRequired(false)),
	async execute(interaction) {
		let message, ephemeral, translation, messageToReply;
		message = await interaction.options.getString("message")
		ephemeral = await interaction.options.getBoolean('private') 
		ephemeral = ephemeral ? true : false
		await interaction.deferReply({ephemeral: ephemeral})
        translation = await translate(message)
        messageToReply = await chatBot(translation, interaction.user.id)
		interaction.editReply({content: messageToReply})
	},
};