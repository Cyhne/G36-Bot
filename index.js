const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const { prefix, token, channel_id} = require('./config.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const cooldowns = new Discord.Collection();

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const modules = ['administrator', 'dev', 'general', 'mentions', 'schedule'];

modules.forEach(c => {
	fs.readdir(`./commands/${c}`, (error, files) => {
		if(error) throw error;
		console.log(`[Commandlogs] Loaded ${files.length} commands of module ${c}`);
		files.forEach(f => {
			const props = require(`./commands/${c}/${f}`);
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(aliases => {
				client.aliases.set(aliases, props.name);
			});
		});
	});
});

client.once('ready', () => {
	console.log('System Ready... G36 Initialized.');
	client.commands.get('morning').run(client);
	client.commands.get('afternoon').run(client);
	client.commands.get('evening').run(client);
	client.commands.get('birthday').run(client);
	client.commands.get('anniversary').run(client);
});

client.on('guildMemberAdd', member => {
	member.guild.channels.cache.find(channel => channel.name === 'general').send(`Welcome ${member.user}. I am this server's maid, please do not hesitate to call upon me.`)
})

client.on('message', message => {
	if(message.content.includes('gn everyone') || message.content.includes('nn everyone') || message.content.includes('Good night everyone')) {
		message.reply('Good night, Master.');
	}
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content) || message.author.bot) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(commandName));

	if(!command) return;

	// Guild Only commands
	if(command.conf.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// Proper documentation
	if(command.conf.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if(command.help.usage) {
			reply += `\nThe proper usage should be: \`${command.help.usage}\``;
		}
		return message.channel.send(reply);
	}

	// COOLDOWN
	if(!cooldowns.has(command.help.name)) {
		cooldowns.set(command.help.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.help.name);
	const cooldownAmount = (command.conf.cooldown || 3) * 1000;

	if(timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.help.name}\` command.`);
		}
	}

	try {
		command.run(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
