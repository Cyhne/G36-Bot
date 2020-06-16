const cron = require('cron').CronJob;

exports.run = (client) => {
	const job = new cron('0 3 10 5 *', () =>{
		client.channels.cache.get('677240190196252675').send('@everyone, today is Imoko\'s birthday. Let us all take some time to wish her a happy birthday! <:Smile36:679463151707881483>');
	});
	job.start();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'birthday',
	description: 'Sends a message on Imoko\'s birthday',
	usage: '',
	example: '',
	category: 'schedule',
};
