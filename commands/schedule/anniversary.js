const cron = require('cron').CronJob;

exports.run = (client) => {
	const job = new cron('0 0 8 5 *', () =>{
		client.channels.cache.get('677240190196252675').send('@everyone, another year has gone by. Thank you commanders for all of your hard work and support! I hope you will continue to keep up your hard work! <:Safety36:689485248601653267>');
	});
	job.start();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'anniversary',
	description: 'Sends a message on EN server\'s anniversary',
	usage: '',
	example: '',
	category: 'schedule',
};
