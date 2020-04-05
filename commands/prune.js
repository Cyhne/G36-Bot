module.exports = {
	name: 'prune',
	description: 'Prune up to 100 messages. | **MANAGE MESSAGE PERM REQUIRED** ',
   args: true,
   usage: '<amount>',
	execute(message, args) {
      if(message.member.hasPermission('MANAGE_MESSAGES'))
      {
		   const amount = parseInt(args[0]) + 1;
   		if (isNaN(amount)) {
   			return message.reply('that doesn\'t seem to be a valid number.');
   		} else if (amount <= 1 || amount > 101) {
   			return message.reply('you need to input a number between 1 and 100.');
   		}

   		message.channel.bulkDelete(amount, true).catch(err => {
   			console.error(err);
   			message.channel.send('there was an error trying to prune messages in this channel!');
   		});
      }
	},
};
