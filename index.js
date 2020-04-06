const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const cron = require('cron').CronJob;

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () =>
{
	console.log('System Ready... G36 initialized.');
});

const job = new cron('0 0 9 * * *', () =>{
	client.channels.cache.get('677558213251563522').send('Guten Morgen, commanders. It looks like today will be another busy day.');
});

const job2 = new cron('0 0 15 * * *', () => {
	client.channels.cache.get('677558213251563522').send('Guten Tag, commanders. Are you maintaining yourselves? Don\'t forget to eat something.');
});

const job3 = new cron('0 0 21 * * *', () => {
	client.channels.cache.get('677558213251563522').send('Guten Nacht, commanders. Thank you for working so hard. Please leave the clean up to me.');
});

job.start();
job2.start();
job3.start();

client.on('message', message =>
{
	if(message.content === 'Good night everyone.' || message.content === 'nn everyone' || message.content === 'gn everyone')
	{
		message.reply('Sweet dreams, master.');
	}

	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	// Guild Only commands
	if(command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// Proper documentation
	if(command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if(command.usage) {
			reply += `\nThe proper usage should be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	// COOLDOWN
	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if(timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	// Run Command
	try{
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

});

client.login(token);
