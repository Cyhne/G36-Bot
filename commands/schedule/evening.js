const cron = require('cron').CronJob;
const { channel_id } = require('../../config.json');

exports.run = (client) => {
	const job = new cron('0 21 * * *', () =>{
		client.channels.cache.get(channel_id).send('Guten Nacht, commanders. Thank you for working so hard. Please leave the clean up to me.');
	});
	job.start();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};
exports.help = {
	name: 'evening',
	description: 'sends a good evening message',
	usage: '',
	example: '',
	category: 'schedule',
};
