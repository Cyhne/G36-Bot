const cron = require('cron').CronJob;
const { channel_id } = require('../../config.json');

exports.run = (client) => {
	const job = new cron('0 9 * * *', () =>{
		client.channels.cache.get(channel_id).send('Guten Morgen, commanders. It looks like today will be another busy day.');
	});
	job.start();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'morning',
	description: 'sends a good morning message',
	usage: '',
	example: '',
	category: 'schedule',
};
