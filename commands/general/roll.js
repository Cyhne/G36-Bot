let {bot_channel} = require('../../config.json');

exports.run = (message, args) => {
	if(args[0]) {
		let amount = args[0];
		if(amount <2)
			message.reply('You can\'t have a dice with that amount of sides!');
		else if(isNaN(amount))
			message.reply('That is not a number!');
		else {
			if(message.channel.id === '697525456441966664') {
				message.channel.send(`${message.author} rolled a **${Math.floor(Math.random()*amount)+1}** :game_die:`); 
			}
			else
				message.channel.send('You are not allowed to use that command here, master!');
		}
	}
	else {
		if(message.channel.id === '697525456441966664')
			message.channel.send(`${message.author} rolled a **${Math.floor(Math.random() * 100)+1}** :game_die:`);
		else
			message.channel.send('You are not allowed to use that command here, master!');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	args: false,
	aliases: ['dice'],
};
exports.help = {
	name: 'roll',
	description: 'Roll a dice!',
	usage: '~roll or ~roll (number)',
	example: '~roll or ~roll 36',
	category: 'general',
};
