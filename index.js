const fs = require('fs');
const Discord = require('discord.js');
const {
   prefix, token
} = require('./config.json');
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

//Dynamically Retrieve Command Files, gets all .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}

//When ready, run this once.
client.once('ready',() => {
  console.log('System Ready... G36 initialized.');
});

client.on('message', message => {
   if(!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).split(/ +/);
   const commandName = args.shift().toLowerCase();

   const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   if(!command) return;

   //Makes GuildOnly commands only work in Servers
   if(command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
   }

   //Provides proper argumentation
   if(command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if(command.usage) {
         reply += `\nThe proper usage should be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
   }

   //cooldowns
   if(!cooldowns.has(command.name)){
      cooldowns.set(command.name, new Discord.Collection());
    }

   //Current Timestamp
   const now = Date.now();
   //Gets collection for triggered command
   const timestamps = cooldowns.get(command.name);
   //Gets cooldown amount and converts to millisecond (uses 3 sec as default)
   const cooldownAmount = (command.cooldown || 3) * 1000;

   //Checks if timestamp has author id in it
   if(timestamps.has(message.author.id)){
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   	if (now < expirationTime) {
   		const timeLeft = (expirationTime - now) / 1000;
   		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
   	}
   }

   try{
      command.execute(message, args);
   } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
   }
});

//Log in with the token
client.login(token);
