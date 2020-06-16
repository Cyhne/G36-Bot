const { readdirSync } = require('fs');
const Discord = require ('discord.js');
const { prefix } = require('../../config.json');

module.exports.run = (message, args) => {
	const data = [];
	const embed = new Discord.MessageEmbed()
		.setColor('#00ADFF')
		.setAuthor(`${message.client.user.username}`, 'https://cdn.discordapp.com/avatars/696026584142053458/17f1ccd506b9d45de31481a70c22b8de.png?size=128')
		.setTitle('**Command List**')
		.setFooter('Use !help (Command Name) to get more information about a specific command or !help to get a full list of commands!');
	if (args[0]) {
		let command = args[0];
		let cmd;
		if (message.client.commands.has(command)) {
			cmd = message.client.commands.get(command);
		}
		else if (message.client.aliases.has(command)) {
			cmd = message.client.commands.get(message.client.aliases.get(command));
		}
		if(!cmd) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${prefix}help\` for the list of the commands.`));
		command = cmd.help;
		embed.setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`);
		embed.setDescription([
			`❯ **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
			`❯ **Description:** ${command.description || 'No Description provided.'}`,
			`❯ **Usage:** ${command.usage ? `\`${command.usage}\`` : 'No Usage'} `,
			`❯ **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'None'}`,
			`❯ **Category:** ${command.category ? command.category : 'General' || 'Misc'}`,
		].join('\n'));

		data.push(embed);
	}
	else{
		const categories = readdirSync('./commands/');
		embed.setDescription([
			`Available commands for ${message.client.user.username}.`,
			`The message.client prefix is **${prefix}**`,
			'`<>`means needed and () it is optional but don\'t include those',
		].join('\n'));
		categories.forEach(category => {
			const dir = message.client.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
			const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

			try {
				if (dir.size === 0) return;
				else if (category !== 'Developer') embed.addField(`❯ **${capitalise}**`, `\`\`\`${dir.map(c => `${c.help.name}`).join('\t\n')}\`\`\``, true);
			}
			catch (e) {
				console.log(e);
			}
		});
		data.push(embed);
	}
	return message.author.send(data, { split: true })
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all my commands!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
			message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['commands', '?', 'h'],
};

exports.help = {
	name: 'help',
	description: 'Provides a list of commands and information about specific commands',
	usage: '~help (command name)',
	example: '~help help',
	category: 'Misc',
};
