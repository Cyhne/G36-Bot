const Discord = require('discord.js');

module.exports = {
	name: 'about',
	description: 'Displays bot information',
	cooldown: 5,
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor('#00ADFF')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
			.setDescription('Guten Tag. I am combat T-doll, G36. It is my honour to be of assistance to you, Master.')
			.setThumbnail('https://cdn.discordapp.com/avatars/696026584142053458/17f1ccd506b9d45de31481a70c22b8de.png?size=128')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://i.imgur.com/wSTFkRM.png')
			.setTimestamp()
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		message.channel.send(embed);
	},
};
