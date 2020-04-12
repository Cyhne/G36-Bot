const cron = require('cron').CronJob;
const { channel_id } = require('../../config.json');

exports.run = (client) => {
	const job = new cron('0 15 * * *', () =>{
		client.channels.cache.get(channel_id).send('Guten Tag, commanders. Are you maintaining yourselves? Don\'t forget to eat something.');
	});
	job.start();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'afternoon',
	description: 'sends a good afternoon message',
	usage: '',
	example: '',
	category: 'schedule',
};
