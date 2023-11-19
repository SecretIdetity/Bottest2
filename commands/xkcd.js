const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xkcd')
        .setDescription('Get xkcd by Number')
        .addStringOption(option =>
            option.setName('number')
                .setDescription('A Number or \'random\'')
                .setRequired(true)),
    async execute(i) {
        let r;
        let l;
        const n = i.options.getString('number');
        if (parseInt(n) == NaN) {
            if (n != 'random' && n != 'r') {
                return await i.reply('Not a Number');
            }
        }
        if (parseInt(n) > 0) {
            l = 'https://xkcd.com/' + n;
        }
        else if (n == 'random' || n == 'r') {
            l = 'https://c.xkcd.com/random/comic/';
        } else {
            return await i.reply('Invalid Number');
        }
        try {
            r = await axios.get(l);
        } catch (e) {
            return await i.reply('Error in fetching');
        }
        if (r == undefined || r.status != 200) {
            return await i.reply('Error in fetching');
        } else {
            let d = r.data;
            let a = d.indexOf('<img src="//imgs.xkcd.com/comics');
            let b = d.substring(d.indexOf('/', a), d.indexOf('" title="', a)).replace('//imgs.xkcd.com/comics/', '');
            let c = d.substring(d.indexOf('" title="', a) + 9, d.indexOf('" alt="', d.indexOf('" title="', a) + 10)).replaceAll('&#39;', '\'');
            let e = d.substring(d.indexOf('" alt="', a) + 7, d.indexOf('"', d.indexOf('" alt="', a) + 8));
            let f = d.substring(d.indexOf('<meta property="og:url" content="') + 33, d.indexOf('">', d.indexOf('<meta property="og:url" content="') + 33));
            const embed = new EmbedBuilder()
                .setColor('#1a57f0')
                .setTitle(e)
                .setURL(f)
                .setDescription(c)
                .setImage('https://imgs.xkcd.com/comics/' + b)
                .setFooter({ text: `#${f.replace('https://xkcd.com/', '').replace('/', '')}` })
                .setTimestamp();
            await i.reply({ embeds: [embed] });
        }
    }
}