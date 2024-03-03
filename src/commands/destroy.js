require("dotenv").config()
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('destroy')
		.setDescription('destroys the app, No reply, ADMIN ONLY'),
	async execute(interaction) {
		if(!interaction.user.id === process.env['ownerId']){
            return interaction.reply({content: "No perms", ephemeral: true})
        }
        await interaction.client.destroy()
        process.exit()
	},
};