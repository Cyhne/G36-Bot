module.exports = {
	name: 'info',
	description: 'Displays info about this server.',
	guildOnly: true,
	cooldown: 10,
	execute(message) {
		message.channel.send(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
	},
};
