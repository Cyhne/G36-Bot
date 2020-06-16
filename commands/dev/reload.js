const { owner_id } = require('../../config.json');
const { readdirSync } = require('fs');
const { join } = require('path');

exports.run = (message, args) => {
	if(message.author.id === owner_id) {
		if (!args[0]) return message.channel.send('Please provide a command to reload!');

		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName) || message.client.commands.get(message.client.aliases.get(commandName));

		if (!command) return message.channel.send('That command doesn\'t exist. Try again.');

		readdirSync(join(__dirname, '..')).forEach(f => {
			const files = readdirSync(join(__dirname, '..', f));
			if (files.includes(`${commandName}.js`)) {
				const file = `../${f}/${commandName}.js`;
				try {
					delete require.cache[require.resolve(file)];
					message.client.commands.delete(commandName);
					const pull = require(file);
					message.client.commands.set(commandName, pull);
					return message.channel.send(`Successfully reloaded \`\`${commandName}\`\`.`);
				}
				catch (err) {
					message.channel.send(`Could not reload: ${args[0].toUpperCase()}\``);
					return console.log(err.stack || err);
				}
			}
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	args: true,
	aliases: [],
};
exports.help = {
	name: 'reload',
	description: 'Reloads a command | **OWNER ONLY**',
	usage: '~reload <command>',
	example: '~reload help',
	category: 'developer',
};
