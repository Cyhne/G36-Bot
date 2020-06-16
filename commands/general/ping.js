exports.run = (message) => {
	message.channel.send('Pong!');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'ping',
	description: 'Ping!',
	usage: '~ping',
	example: '~ping',
	category: 'general',
};
