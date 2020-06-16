const Discord = require ('discord.js');
const { name, owner } = require('../../config.json');

exports.run = (message) => {
	const uptime = process.uptime();
	const days = Math.floor(uptime / 60 / 60 / 24), hours = Math.floor(uptime / 60 / 60 % 24), minutes = Math.floor(uptime / 60 % 60), seconds = Math.floor(uptime % 61);
	const daysStr = `${days.toLocaleString()}d`, hoursStr = `${hours.toLocaleString()}h`, minutesStr = `${minutes.toLocaleString()}m`, secondsStr = `${seconds.toLocaleString()}s`;
	const time = `${days > 0 ? `${daysStr} ` : ''} ${hours > 0 ? `${hoursStr} ` : ''} ${minutesStr} ${secondsStr}`;
	const serverStr = ((message.client.guilds.cache.size === 1) ? 'server' : 'servers');
	const embed = new Discord.MessageEmbed()
		.setColor('#00ADFF')
		.setAuthor(`${name}`, 'https://cdn.discordapp.com/avatars/696026584142053458/17f1ccd506b9d45de31481a70c22b8de.png?size=128')
		.setDescription(`Guten Tag. I am combat T-doll, **${name}**. It is my honour to be of assistance to you, Master.`)
		.setThumbnail('https://cdn.discordapp.com/avatars/696026584142053458/17f1ccd506b9d45de31481a70c22b8de.png?size=128')
		.addFields(
			{
				name: 'Current Status:',
				value: `I have been active for **${time}** and am currently serving **${message.client.guilds.cache.size} ${serverStr}**. If you have requests please let me know, I believe in your judgements.` },
			{
				name: 'Useful Links',
				value: '<:GitHub:696235088819519549> [GitHub Repository](https://github.com/Cyhne/G36-Bot)\n:book: [Wikipedia](https://en.wikipedia.org/wiki/Heckler_%26_Koch_G36)',
				inline: true,
			},
			{
				name: '\u200b',
				value: '<:GK:696237243223769178> [GFLWiki](https://en.gfwiki.com/wiki/G36)',
				inline: true,
			},
		)
		.setTimestamp()
		.setFooter(`${owner}`);

	message.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	cooldown: 5,
	aliases: ['aboutme'],
};
exports.help = {
	name: 'about',
	description: 'Displays information about this bot',
	usage: '~about',
	example: '~about',
	category: 'general',
};
