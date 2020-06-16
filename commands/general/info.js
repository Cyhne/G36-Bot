const Discord = require ('discord.js');

exports.run = (message) => {
	const embed = new Discord.MessageEmbed()
		.setColor('#00ADFF')
		.setTitle(`${message.guild.name}`)
		.setThumbnail(message.guild.iconURL)
		.setDescription('**Server Information:**')
		.addFields(
			{
				name: '__Total Number of Members:__',
				value: `**${message.guild.memberCount}**` },
			{
				name: '__Online Members__',
				value: `**${message.guild.members.cache.filter(member => member.presence.status === 'online').size}**`,
				inline: true,
			},
			{
				name: '__Idle Members__',
				value: `**${message.guild.members.cache.filter(member => member.presence.status === 'idle').size}**`,
				inline: true,
			},
			{
				name: '__Do Not Disturb__',
				value: `**${message.guild.members.cache.filter(member => member.presence.status === 'dnd').size}**`,
				inline: true,
			},
			{
				name: '__Offline Members__',
				value: `**${message.guild.members.cache.filter(member => member.presence.status === 'offline').size}**`,
				inline: true,
			},
			{
				name: '\u200b',
				value: '\u200b',
				inline: true,
			},
			{
				name: '__Number of Bots__',
				value: `**${message.guild.members.cache.filter(member => member.user.bot).size}**`,
				inline: true,
			},
		)
		.setTimestamp()
		.setFooter('G36');
	message.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	cooldown: 10,
	aliases: ['serverinfo'],
};
exports.help = {
	name: 'info',
	description: 'Provides information about the server',
	usage: '~info',
	example: '~info',
	category: 'general',
};
