exports.run = (message) => {
	message.channel.send(`${message.author} rolled a **${Math.floor(Math.random() * 100)}** :game_die:`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	args: false,
	aliases: ['dice'],
};
exports.help = {
	name: 'roll',
	description: 'Roll a dice!',
	usage: '!roll',
	example: '!roll',
	category: 'general',
};
