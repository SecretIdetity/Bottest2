const { REST, Routes } = require('discord.js');
conf = require('./data/config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(conf.token);

(async () => {
    try {
        console.log(`cmds: ${commands.length} ${conf.id}`);

        const data = await rest.put(
            Routes.applicationCommands(conf.id),
            { body: commands },
        );

        console.log(`finish: ${data.length}`);
    } catch (error) {
        console.error(error);
    }
})();
