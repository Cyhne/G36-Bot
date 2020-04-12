exports.run = (message, args) => {
	if(message.member.hasPermission('MANAGE_MESSAGES') || message.channel.type === 'dm') {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('Master, that is not a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('I can only clean up 1 to 100 messages, master.');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was a problem trying to clear messages in this channel!');
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	args: true,
	aliases: ['del', 'clean', 'clear'],
};
exports.help = {
	name: 'prune',
	description: 'Deletes a specified amount of messages | **REQUIRES MANAGE MESSAGES**',
	usage: '!prune <amount>',
	example: '!prune 50',
	category: 'administrator',
};
