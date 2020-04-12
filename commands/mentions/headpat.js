exports.run = (message) => {
	message.channel.send('What are you doing, master?');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'headpat',
	description: 'replies when headpatted',
	usage: '@G36#4425 headpat',
	example: '@G36#4425 headpat',
	category: 'mentions',
};
