const cron = require('cron').CronJob;
let { maintactive } = require('../../config.json');

exports.run = (message, args) => {
	const day = parseInt(args[1]);
	const month = parseInt(args[0]);
	if(day > 31 || month > 12) {
		return message.reply('The date is too large or not a correct value. Please use 1-31 for date and 1-12 for month');
	}
	if(message.member.hasPermission('ADMINISTRATOR') && !maintactive) {
		const job = new cron(`0 0 11 ${day} ${month - 1} *`, () => {
			message.channel.send('Master, the maintanence has ended.');
			job.stop();
			maintactive = false;
		});
		job.start();
		message.channel.send('Maintenance noted. I will announce when it is over, master.');
		maintactive = true;
	}
	else {
		message.channel.send('Master, you have already set a maintenance note.');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	args: true,
	aliases: ['maintenance'],
};
exports.help = {
	name: 'maint',
	description: 'Sets an alarm for when maintenance ends.',
	usage: '~maint <month> <day>',
	example: '~maint 4 9 %%sets alarm on April 9th%%',
	category: 'administrator',
};
