//since 1/5/22: +added -removed >fixed
const { Collection, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Message, ContextMenuInteraction, DiscordAPIError, CommandInteractionOptionResolver, GatewayIntentBits, Partials, InteractionCollector, REST, Routes, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { registerFont, createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');
cf = 'config.json';
df = 'data.json';
ef = 'epic.json';
gf = 'games.json';
ddir = './data/';
if (0) { //debug
    cf = 'configg.json';
    df = 'dataa.json';
    ef = 'epicc.json';
    gf = 'gamess.json';
}
if (fs.existsSync("/data/" + cf))
    ddir = '/data/';
cf = ddir + cf;
df = ddir + df;
ef = ddir + ef;
gf = ddir + gf;
conf = require(cf);
data = require(df);
egfg = require(ef);
games = require(gf);
const aes = require('./aes');
registerFont('NotoSans-Black.ttf', { family: 'Noto Sans' })
const gifencoder = require('gifencoder');
const { ButtonStyle } = require('discord-api-types/v10');
const { isStringObject } = require('util/types');
'use strict';
const { networkInterfaces } = require('os');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
    restRequestTimeout: 60000, partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});
var c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18;
var log = fs.createWriteStream(ddir + 'logs.txt', { flags: 'a' });
let d = new Date();
var rnd = [];

while (d.getHours() > 23 || d.getHours() < 7) {
    die(300000);
}

//slash commands bs i aint gonna rewrite that
client.commands = new Collection();
const cpath = path.join(__dirname, 'commands');
const cfiles = fs.readdirSync(cpath).filter(file => file.endsWith('.js'));
for (const f of cfiles) {
    const p = path.join(cpath, f);
    const c = require(p);
    if ('data' in c && 'execute' in c) {
        client.commands.set(c.data.name, c);
    } else {
        console.log(`failed ${p}`);
    }
}

async function die(a) {
    await sleep(a);
    process.exit(1);
}

if (data == undefined || data.restart == undefined || data.restart > 250) {
    if (!conf.debug) {
        console.log('Boot looping! Startup prevented.');
        process.exit(0);
    }
}
data.restart++;

const sup = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺',
    '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', 'π': 'ᵖ', 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ',
    'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ',
    's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ', 'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ',
    'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ',
    'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ᵛ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
}

const sub = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊',
    '-': '₋', '=': '₌', '(': '₍', ')': '₎', 'a': 'ₐ', 'c': '꜀', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'l': 'ₗ', 'm': 'ₘ',
    'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ'
}


client.on('shardResume', (s, n) => {
    setStatus(0);
});
client.on('error', (e) => {
    console.log(e);
});
client.once('ready', async () => {
    echan = {}
    xchan = {}
    wchan = {}
    for (let guild in data.d) {
        echan[guild] = client.channels.cache.get(data.d[guild].epic);
        xchan[guild] = client.channels.cache.get(data.d[guild].xk);
        wchan[guild] = client.channels.cache.get(data.d[guild].wel);
    }
    c1 = await loadImage('./chess/1.png');
    c2 = await loadImage('./chess/2.png');
    c3 = await loadImage('./chess/3.png');
    c4 = await loadImage('./chess/4.png');
    c5 = await loadImage('./chess/5.png');
    c6 = await loadImage('./chess/6.png');
    c7 = await loadImage('./chess/7.png');
    c8 = await loadImage('./chess/8.png');
    c9 = await loadImage('./chess/9.png');
    c10 = await loadImage('./chess/10.png');
    c11 = await loadImage('./chess/11.png');
    c12 = await loadImage('./chess/12.png');
    c13 = await loadImage('./chess/13.png');
    c14 = await loadImage('./chess/14.png');
    c15 = await loadImage('./chess/15.png');
    c16 = await loadImage('./chess/16.png');
    c17 = await loadImage('./chess/17.png');
    c18 = await loadImage('./chess/18.png');
    for (let j in data) {
        if (j == 'ttt' || j == 'con' || j == 'chess')
            for (let i in data.d[guild][j]) {
                await client.users.fetch(data.d[guild][j][i].usr.id);
                await client.users.fetch(data.d[guild][j][i].init.id);
                data.d[guild][j][i].usr = client.users.cache.get(data.d[guild][j][i].usr.id);
                data.d[guild][j][i].init = client.users.cache.get(data.d[guild][j][i].init.id);
            }
    }
    for (let guild in data.d) {
        for (let j in data.d[guild].message) {
            let t = await client.channels.fetch(data.d[guild].message[j].channelId);
            data.d[guild].message[j] = await t.messages.fetch(j);
        }
    }
    setStatus(0);
    console.log(`${client.user.tag}!`);
})
client.on("guildMemberRemove", member => {
    if (wchan[member.guild.id] != undefined)
        wchan[member.guild.id].send(`${member} has decided to abandon ship.`)
})
client.on("guildMemberAdd", async member => {
    if (wchan[member.guild.id] == undefined)
        return;
    let u = client.users.cache.get(member.user.id);
    const canvas = createCanvas(2048, 256);
    const ctx = canvas.getContext('2d');
    if (u.avatar == null) {
        fs.copyFile('./fix.png', './avatar.png', (err) => {
            if (err) throw err;
        });
    }
    else {
        const r = await axios({ url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png?size=256", method: 'GET', responseType: 'stream' });
        await r.data.pipe(fs.createWriteStream('./avatar.png'));
    }
    await sleep(500);
    let a;
    try {
        a = await loadImage('./avatar.png');
    } catch (e) {
        await sleep(1000);
        try {
            a = await loadImage('./avatar.png');
        } catch (e) {
            await sleep(5000);
            try {
                a = await loadImage('./avatar.png');
            } catch (e) { a = await loadImage('./fix.png'); }
        }
    }
    const c = await loadImage('./welcome.png');
    ctx.drawImage(c, 0, 0, 2048, 256);
    ctx.fillStyle = '#000000';
    ctx.font = '48pt "Noto Sans"';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${member.user.username} has boarded the ship!`, 256, 128);
    ctx.beginPath();
    ctx.arc(128, 128, 64, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(a, 64, 64, 128, 128);
    ctx.restore();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(128, 128, 64, 0, Math.PI * 2, false);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    const b = canvas.toBuffer('image/png');
    fs.writeFileSync('./avatar.png', b);
    await wchan[member.guild.id].send({ content: `Welcome ${u}!`, files: ['./avatar.png'] });
    fs.unlinkSync('./avatar.png');
})
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            return;
        }
    }
    const message = !reaction.message.author ? await reaction.message.fetch() : reaction.message;
    if (reaction.emoji.name == '❌' && user.id == conf.admin) {
        try {
            await message.delete();
        } catch (e) { };
    }
});
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    //if(message.content.replace(':DB:').match(/^[^a-z]+$/) && message.content.replace(':DB:').match(/.*[A-Z].*/) && message.content.length > 3){
    //    message.channel.send('caps');
    //    return;
    //}
    if (message.content.startsWith('-p')) {
        message.react('🙁');
        return;
    }
    if (data.d[message.guild.id] == undefined) {
        data.d[message.guild.id] = {}
        data.d[message.guild.id].gid = message.guild.id;
        data.d[message.guild.id].ttt = {};
        data.d[message.guild.id].con = {};
        data.d[message.guild.id].chess = {};
        data.d[message.guild.id].chessusr = {};
        data.d[message.guild.id].message = {};
        data.d[message.guild.id].epicusr = {};
        data.d[message.guild.id].prefix = '.';
        data.d[message.guild.id].xk = '';
        data.d[message.guild.id].epic = '';
        data.d[message.guild.id].wel = '';
    }
    if (message.content == data.d[message.guild.id].prefix) return;
    if (!message.content.startsWith(data.d[message.guild.id].prefix)) return;
    if (message.content.startsWith(data.d[message.guild.id].prefix + data.d[message.guild.id].prefix)) return;
    if (message.content.startsWith('.ty')) return; //temp because of overlap with tyrexe
    log.write(`${message.author.username}#${message.author.discriminator} in ${message.channel.name} ${message.guild.id} on ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(message.createdTimestamp))}: ${message.content}\n`); //cmd debug
    let commandBody = message.content.slice(data.d[message.guild.id].prefix.length);
    const args = commandBody.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').split(' ');
    const command = args.shift().toLowerCase();
    let s = '';
    if (command === "ttt" || command === 'tictactoe' || command === '3') {
        if (data.d[message.guild.id].ttt == undefined)
            data.d[message.guild.id].ttt = {};
        let init = message.author;
        let turn = random(2);
        let user = args.shift();
        if (user == undefined) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        user = user.toLowerCase();
        user = user.replace('<', '');
        user = user.replace('@', '');
        user = user.replace('!', '');
        user = user.replace('>', '');
        try {
            const s = message.channel.guild.members.cache.get(user);
        }
        catch (e) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        const us = message.channel.guild.members.cache.get(user);
        const usr = us.user;
        if (usr == undefined) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        if (usr.bot) {
            message.channel.send(`You cannot challenge bots,\n${init}.`);
            return;
        }
        s = `${init} is playing TicTacToe against ${usr}\n`;
        if (!turn) {
            s += `It's ⭕${init}'s turn.`;
        }
        else {
            s += `It's ❌${usr}'s turn.`;
        }
        const r1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('a0').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a1').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a2').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a9').setLabel('🏳️').setStyle(ButtonStyle.Danger));
        const r2 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('a3').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a4').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a5').setLabel('.').setStyle(ButtonStyle.Secondary));
        const r3 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('a6').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a7').setLabel('.').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('a8').setLabel('.').setStyle(ButtonStyle.Secondary));
        let sent = await message.channel.send({ content: s, components: [r1, r2, r3] });
        data.d[message.guild.id].ttt[sent.id] = {};
        data.d[message.guild.id].ttt[sent.id].turn = turn;
        data.d[message.guild.id].ttt[sent.id].init = init;
        data.d[message.guild.id].ttt[sent.id].usr = usr;
        data.d[message.guild.id].ttt[sent.id].channel = sent.channel.id;
        data.d[message.guild.id].ttt[sent.id].data = new Array(9).fill(0);
        data.d[message.guild.id].ttt[sent.id].time = new Date().getTime();
    }
    else if (command == 'u' || command == 'uno') {
        if (data.uno == undefined)
            data.uno = {};
        let user = args;
        user.forEach(s, i => {
            user[i] = s.toLowerCase().replace('<', '').replace('@', '').replace('!', '').replace('>', '');
            try {
                const t = message.channel.guild.members.cache.get(s);
            }
            catch (e) {
                message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
                return;
            }
            const us = message.channel.guild.members.cache.get(s);
            const usr = us.user;
            if (usr == undefined) {
                message.channel.send(`Please add a valid user using @ or the users id,\n${message.author}.`);
                return;
            }
            if (usr.bot) {
                message.channel.send(`You cannot challenge bots,\n${message.author}.`);
                return;
            }
        });
        user.push(message.author);
        const r1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('fa').setLabel('1').setStyle(ButtonStyle.Secondary));
        let sent = await message.channel.send({ content: "Use the Button to see your Deck.\nIt's only valid for 15 Minutes (per Discord).", components: [r1] });
        data.uno[sent.id] = {};
        data.uno[sent.id].turn = random(user.length);
        data.d[message.guild.id].ttt[sent.id].channel = sent.channel.id;
        data.d[message.guild.id].ttt[sent.id].data = new Array(9).fill(0);
        data.d[message.guild.id].ttt[sent.id].user = user;
    }
    else if (command == 'thisisthesupersecretdeletefunction') {
        //else if(command == 'del' || command == 'unspam' || command == 'delete'){
        message.channel.send(`This feature of bulk-deleting messages is currently deactivated,\n${message.author}.`);
        return;
        let i = 0;
        let t = args.shift();
        if (t == undefined) {
            t = '1';
        }
        t = t.toLowerCase();
        let channel = message.channel;
        try {
            t = parseInt(t);
        } catch (e) { message.channel.send(`Please add a valid integer number of messages to delete,\n${message.author}.`); return; }
        if (Number.isInteger(t)) {
            i = t;
        }
        channel.bulkDelete(i + 1);
        console.log(`${message.author} deleted ${i + 1} messages in ${channel.id}.`)
    }
    else if (command == '4win' || command == 'connect4' || command == '4' || command == 'connect') {
        if (data.d[message.guild.id].con == undefined)
            data.d[message.guild.id].con = {};
        let init = message.author;
        let turn = random(2);
        let user = args.shift();
        if (user == undefined) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        user = user.toLowerCase();
        user = user.replace('<', '');
        user = user.replace('@', '');
        user = user.replace('!', '');
        user = user.replace('>', '');
        try {
            const s = message.channel.guild.members.cache.get(user);
        }
        catch (e) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        const us = message.channel.guild.members.cache.get(user);
        const usr = us.user;
        if (usr == undefined) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        if (usr.bot) {
            message.channel.send(`You cannot challenge bots,\n${init}.`);
            return;
        }
        s = `${init} is playing connect 4 against ${usr}\n`;
        if (!turn) {
            s += `It's ⭕${init}'s turn.`;
        }
        else {
            s += `It's ❌${usr}'s turn.`;
        }
        s += '\n```\n| 1  2  3  4  5  6  7|';
        for (let i = 0; i < 6; i++)
            s += '\n|  |  |  |  |  |  |  |';
        s += '\n```';
        const r1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('b0').setLabel('1').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b1').setLabel('2').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b2').setLabel('3').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b3').setLabel('4').setStyle(ButtonStyle.Secondary));
        const r2 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('b4').setLabel('5').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b5').setLabel('6').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b6').setLabel('7').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b7').setLabel('🏳️').setStyle(ButtonStyle.Danger));
        let sent = await message.channel.send({ content: s, components: [r1, r2] });
        data.d[message.guild.id].con[sent.id] = {};
        data.d[message.guild.id].con[sent.id].turn = turn;
        data.d[message.guild.id].con[sent.id].init = init;
        data.d[message.guild.id].con[sent.id].usr = usr;
        data.d[message.guild.id].con[sent.id].channel = sent.channel.id;
        data.d[message.guild.id].con[sent.id].data = new Array(42).fill(0);
        data.d[message.guild.id].con[sent.id].time = new Date().getTime();
    }
    else if (command == 'test') {
        message.channel.send(`yaay ${message.author} test complete`);
    }
    else if (command == 'pp' || command == 'ping') {
        message.channel.send(`${new Date().getTime() - message.createdTimestamp}`);
    }
    else if (command == 'ip') {
        if (message.author.id != conf.admin)
            return;
        const nets = networkInterfaces();
        const results = Object.create(null);
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
                if (net.family === familyV4Value && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                }
            }
        }
        message.channel.send(results["WiFi"] ? results["WiFi"][0] : results["wlan0"] ? results["wlan0"][0] : 'not found rip');
    }
    else if (command == ':muscle:' || command == '💪')
        message.channel.send("💪");
    else if (command == 'send') {
        if (message.author.id != conf.admin)
            return;
        try {
            send = client.channels.cache.get(args.shift());
            if (args.length == 0)
                return;
            send.send(args.join(" "));
        }
        catch (e) { }
    }
    else if (command == 'clear') {
        data.d[message.guild.id].ttt = {};
        data.d[message.guild.id].con = {};
        data.d[message.guild.id].chess = {};
        data.d[message.guild.id].chessusr = {};
        data.d[message.guild.id].message = {};
        message.channel.send('cleared');
    }
    else if (command == 'clearall') {
        for (let guild in data.d) {
            data.d[guild].ttt = {};
            data.d[guild].con = {};
            data.d[guild].chess = {};
            data.d[guild].chessusr = {};
            data.d[guild].message = {};
        }
        message.channel.send('cleared all');
    }
    else if (command == 'save') {
        if (message.author.id != conf.admin)
            return;
        let msg = message.channel.send('saving...');
        await save();
        (await msg).edit('saved');
    }
    else if (command == 'reload') {
        if (message.author.id != conf.admin)
            return;
        message.channel.send('reloading...');
        die(1000);
    }
    else if (command == 'restart') {
        if (message.author.id != conf.admin)
            return;
        message.channel.send('restarting...');
        await save();
        die(1000);
    }
    else if (command == 'rng') {
        if (message.author.id != conf.admin)
            return;
        let cmd = args.shift();
        if (cmd == 'get') {
            message.channel.send(data.ctr + ' ' + rnd.length);
        } else if (cmd == 'set') {
            let r1 = parseInt(args.shift());
            let r2 = parseInt(args.shift());
            if (r1 >= 0 && r2 == 0) {
                data.ctr = r1;
                rnd = [];
                message.channel.send(data.ctr + ' ' + rnd.length);
            } else if (r1 >= 0 && r2 >= 0 && r2 < 4) {
                data.ctr = r1 - 1;
                rnd = [];
                while (r2 != rng.length) {
                    random(1);
                }
                message.channel.send(data.ctr + ' ' + rnd.length);
            } else {
                message.channel.send('invalid number');
            }
        }
    }
    else if (command == 'chess' || command == 'c' || command == '2') {
        if (data.d[message.guild.id].chess == undefined)
            data.d[message.guild.id].chess = {};
        if (data.d[message.guild.id].chessusr == undefined)
            data.d[message.guild.id].chessusr = {};
        if (data.d[message.guild.id].message == undefined)
            data.d[message.guild.id].message = {};
        let init = message.author;
        let color = random(2);
        let user = args.shift();
        let dat = [10, 8, 9, 11, 12, 9, 8, 10, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 3, 5, 6, 3, 2, 4];
        if (user == undefined) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        user = user.toLowerCase();
        user = user.replace('<', '');
        user = user.replace('@', '');
        user = user.replace('!', '');
        user = user.replace('>', '');
        try {
            const s = message.channel.guild.members.cache.get(user);
        }
        catch (e) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        const us = message.channel.guild.members.cache.get(user);
        let usr = undefined;
        try {
            usr = us.user;
        } catch (e) { console.log(e); }
        if (data.d[message.guild.id].chessusr[init.id] != undefined) {
            message.channel.send(`You already have an active game of chess,\n${init}.`);
            return;
        }
        if (usr == undefined) {
            message.channel.send(`Please add a valid user using @ or the users id,\n${init}.`);
            return;
        }
        if (usr.bot) {
            message.channel.send(`You cannot challenge bots,\n${init}.`);
            return;
        }
        if (data.d[message.guild.id].chessusr[usr.id] != undefined) {
            message.channel.send(`${usr.username} already has an active game of chess,\n${init}.`);
            return;
        }
        s = `${init} is playing chess against ${usr}\n`;
        if (color == 0) {
            s += `It's ⬜${init}'s turn. Use ${data.d[message.guild.id].prefix}m/move pos1 pos2 to move your pieces.\nUse ${data.d[message.guild.id].prefix}d/${data.d[message.guild.id].prefix}draw to offer a draw and ${data.d[message.guild.id].prefix}resign to resign.`;
        }
        else {
            s += `It's ⬜${usr}'s turn. Use ${data.d[message.guild.id].prefix}m/move pos1 pos2 to move your pieces.\nUse ${data.d[message.guild.id].prefix}d/${data.d[message.guild.id].prefix}draw to offer a draw and ${data.d[message.guild.id].prefix}resign to resign.`;
        }
        let g = new Array(64).fill(0);
        let h = new Array(12).fill(0);
        let n = '0001000' + random(100000);
        fs.mkdirSync(`${ddir}${n}`);
        if (color)
            await chessimg(dat, [-1, -1, -1, -1], g, usr.username, init.username, 0, h, n, n, 0);
        else
            await chessimg(dat, [-1, -1, -1, -1], g, init.username, usr.username, 0, h, n, n, 0);
        let sent = await message.channel.send({ content: s, files: [`${ddir}${n}.png`] });
        data.d[message.guild.id].chess[sent.id] = {};
        data.d[message.guild.id].chess[sent.id].turn = 0;
        data.d[message.guild.id].chess[sent.id].color = color;
        data.d[message.guild.id].chess[sent.id].init = init;
        data.d[message.guild.id].chess[sent.id].usr = usr;
        data.d[message.guild.id].chess[sent.id].channel = sent.channel.id;
        data.d[message.guild.id].chess[sent.id].data = dat;
        data.d[message.guild.id].chess[sent.id].extra = g;
        data.d[message.guild.id].chess[sent.id].taken = h;
        data.d[message.guild.id].chess[sent.id].draw = [0, 0, 0, 0];
        data.d[message.guild.id].chess[sent.id].time = new Date().getTime();
        data.d[message.guild.id].chessusr[usr.id] = sent.id;
        data.d[message.guild.id].chessusr[init.id] = sent.id;
        data.d[message.guild.id].message[sent.id] = sent;
        fs.renameSync(`${ddir}${n}`, `${ddir}${sent.id}`);
        fs.unlinkSync(`${ddir}${n}.png`);
    }
    else if (command == 'move' || command == 'm') {
        if (data.d[message.guild.id].chessusr[message.author.id] == undefined) {
            message.channel.send(`You do not have an active game,\n${message.author}.`);
            return;
        }
        let chessdata = data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]];
        if (chessdata.usr.id != chessdata.init.id)
            if ((chessdata.color + chessdata.turn) % 2 == 0) {
                if (message.author.id != chessdata.init.id) {
                    message.channel.send(`It is not your turn,\n${message.author}.`);
                    return;
                }
            }
            else {
                if (message.author.id != chessdata.usr.id) {
                    message.channel.send(`It is not your turn,\n${message.author}.`);
                    return;
                }
            }
        let pos1 = args.shift();
        if (pos1 == undefined) {
            message.channel.send(`Please enter a valid first position,\n${message.author}.`);
            return;
        }
        pos1 = pos1.toLowerCase();
        if (pos1.charCodeAt(0) < 97 || pos1.charCodeAt(0) > 104 || pos1[1] < 1 || pos1[1] > 8 || pos1[1] == undefined) {
            message.channel.send(`Please enter a valid first position,\n${message.author}.`);
            return;
        }
        let pos2 = args.shift();
        if (pos2 == undefined) {
            message.channel.send(`Please enter a valid second position,\n${message.author}.`);
            return;
        }
        pos2 = pos2.toLowerCase();
        if (pos2.charCodeAt(0) < 97 || pos2.charCodeAt(0) > 104 || pos2[1] < 1 || pos2[1] > 8 || pos2[1] == undefined) {
            message.channel.send(`Please enter a valid second position,\n${message.author}.`);
            return;
        }
        let p1 = parseInt(8 - pos1[1]) * 8 + parseInt(pos1.charCodeAt(0)) - 97;
        let p2 = parseInt(8 - pos2[1]) * 8 + parseInt(pos2.charCodeAt(0)) - 97;
        let m = chessmove(chessdata.data, p1, p2, chessdata.turn, chessdata.extra);
        switch (m) {
            case 0:
                message.channel.send(`You cannot move that,\n${message.author}.`);
                break;
            case 1:
                message.channel.send(`You cannot move there,\n${message.author}.`);
                break;
            case 2:
                let e = JSON.parse(JSON.stringify(chessdata.data));
                let f = JSON.parse(JSON.stringify(chessdata.extra));
                e[p2] = parseInt(e[p1]);
                e[p1] = 0;
                f[p1] += 1;
                f.fill(0, 8, 15);
                f.fill(0, 48, 55);
                if (p1 > 7 && p1 < 16 && p2 > 23 && p2 < 32)
                    f[p1] = 1;
                if (p1 > 47 && p1 < 56 && p2 > 31 && p2 < 40)
                    f[p1] = 1;
                if (chesscheck(e, (chessdata.turn + 0) % 2, f) > -1) {
                    message.channel.send(`You must get out of check,\n${message.author}.`);
                    return;
                }
                let q = '';
                let pb = 0;
                if (chessdata.data.d[p1] == 1 && p2 < 8) {
                    q = args.shift();
                    if (q == undefined) {
                        message.channel.send(`You must specify a unit to promote to after your second position with\nk/knight, b/bishop, r/rook, q/queen,\n${message.author}.`);
                        return;
                    }
                    q = q.toLowerCase();
                    if (q != 'k' && q != 'knight' && q != 'b' && q != 'bishop' && q != 'r' && q != 'rook' && q != 'q' && q != 'queen') {
                        message.channel.send(`You must specify a unit to promote to after your second position with\nk/knight, b/bishop, r/rook, q/queen,\n${message.author}.`);
                        return;
                    }
                    else
                        pb = 1;
                }
                if (chessdata.data.d[p1] == 7 && p2 > 56) {
                    q = args.shift();
                    if (q == undefined) {
                        message.channel.send(`You must specify a unit to promote to after your second position with\nk/knight, b/bishop, r/rook, q/queen,\n${message.author}.`);
                        return;
                    }
                    q = q.toLowerCase();
                    if (q != 'k' && q != 'knight' && q != 'b' && q != 'bishop' && q != 'r' && q != 'rook' && q != 'q' && q != 'queen') {
                        message.channel.send(`You must specify a valid unit to promote to after your second position with\nk/knight, b/bishop, r/rook, q/queen,\n${message.author}.`);
                        return;
                    }
                    pb = 2;
                }
                let r = [-1, -1];
                if (chessdata.draw[0] != 0) {
                    if (chessdata.draw[2] == 0)
                        data.d[message.guild.id].message[chessdata.draw[0]].edit({ content: 'This draw offer has expired.', components: [] });
                    delete data.d[message.guild.id].message[chessdata.draw[0]];
                }
                if (chessdata.draw[1] != 0) {
                    if (chessdata.draw[3] == 0)
                        if (data.d[message.guild.id].message[chessdata.draw[1]].content == s)
                            data.d[message.guild.id].message[chessdata.draw[1]].edit({ content: 'This draw offer has expired.', components: [] });
                    delete data.d[message.guild.id].message[chessdata.draw[1]];
                }
                chessdata.draw = [0, 0, 0, 0];
                chessdata.turn = (chessdata.turn + 1) % 2;
                if (chessdata.data.d[p2] == 0)
                    if (chessdata.data.d[p1] == 1 || chessdata.data.d[p1] == 7) {
                        if (p1 - p2 == 7 || p1 - p2 == 9) {
                            if (chessdata.data.d[p2 + 8] != 0)
                                chessdata.taken[chessdata.data.d[p2 + 8] - 1]++;
                            chessdata.data.d[p2 + 8] = 0;
                        }
                        if (p2 - p1 == 7 || p2 - p1 == 9) {
                            if (chessdata.data.d[p2 - 8] != 0)
                                chessdata.taken[chessdata.data.d[p2 - 8] - 1]++;
                            chessdata.data.d[p2 - 8] = 0;
                        }
                    }
                if (chessdata.data.d[p1] == 6 || chessdata.data.d[p1] == 12) {
                    if (p2 == p1 + 2) {
                        chessdata.data.d[p1 + 1] = chessdata.data.d[p1 + 3];
                        chessdata.data.d[p1 + 3] = 0;
                        r[0] = p1 + 1;
                        r[1] = p1 + 3;
                    }
                    if (p2 == p1 - 2) {
                        chessdata.data.d[p1 - 1] = chessdata.data.d[p1 - 4];
                        chessdata.data.d[p1 - 4] = 0;
                        r[0] = p1 - 1;
                        r[1] = p1 - 4;
                    }
                }
                if (chessdata.data.d[p2] != 0)
                    chessdata.taken[chessdata.data.d[p2] - 1]++;
                chessdata.data.d[p2] = parseInt(chessdata.data.d[p1]);
                chessdata.data.d[p1] = 0;
                if (pb == 1)
                    switch (q) {
                        case 'b': case 'bishop':
                            chessdata.data.d[p2] = 2;
                        case 'k': case 'knight':
                            chessdata.data.d[p2] = 3;
                        case 'r': case 'rook':
                            chessdata.data.d[p2] = 4;
                        case 'q': case 'queen':
                            chessdata.data.d[p2] = 5;
                    }
                if (pb == 2)
                    switch (q) {
                        case 'b': case 'bishop':
                            chessdata.data.d[p2] = 8;
                        case 'k': case 'knight':
                            chessdata.data.d[p2] = 9;
                        case 'r': case 'rook':
                            chessdata.data.d[p2] = 10;
                        case 'q': case 'queen':
                            chessdata.data.d[p2] = 11;
                    }
                chessdata.extra[p1] += 1;
                chessdata.extra.fill(0, 8, 15);
                chessdata.extra.fill(0, 48, 55);
                if (p1 > 7 && p1 < 16 && p2 > 23 && p2 < 32)
                    chessdata.extra[p1] = 1;
                if (p1 > 47 && p1 < 56 && p2 > 31 && p2 < 40)
                    chessdata.extra[p1] = 1;
                //try{
                //    data.d[message.guild.id].message[data.d[message.guild.id].chessusr[chessdata.init.id]].delete();
                //}catch(e){console.log(e);} //delete last message, deactivated for now @tyo
                try {
                    delete data.d[message.guild.id].message[data.d[message.guild.id].chessusr[chessdata.init.id]];
                } catch (e) { console.log(e); }
                let p = chesscheck(chessdata.data, (chessdata.turn + 0) % 2, chessdata.extra);
                let g = checkmate(chessdata.data, (chessdata.turn + 0) % 2, chessdata.extra);
                let t = "";
                if (p > -1) {
                    if (g == 1) {
                        if ((chessdata.turn + chessdata.color) % 2)
                            s = `${chessdata.init} won against\n${chessdata.usr} by checkmate.`;
                        else
                            s = `${chessdata.usr} won against\n${chessdata.init} by checkmate.`;
                        if (chessdata.color)
                            await chessimg(chessdata.data, [p1, p2, r[0], r[1]], chessdata.extra, chessdata.usr.username, chessdata.init.username, (chessdata.turn + 1) % 2 + 2, chessdata.taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                        else
                            await chessimg(chessdata.data, [p1, p2, r[0], r[1]], chessdata.extra, chessdata.init.username, chessdata.usr.username, (chessdata.turn + 1) % 2 + 2, chessdata.taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                        let m = await message.channel.send({ content: s, files: [`${ddir}${message.id}.png`] });
                        fs.unlinkSync(`${ddir}${message.id}.png`);
                        chessgif(data.d[message.guild.id].chessusr[message.author.id], m);
                        let temp = JSON.parse(JSON.stringify(data.d[message.guild.id].chessusr[message.author.id]));
                        try {
                            delete data.d[message.guild.id].chessusr[chessdata.init.id];
                        } catch (e) { console.log(e); }
                        try {
                            delete data.d[message.guild.id].chessusr[chessdata.usr.id];
                        } catch (e) { console.log(e); }
                        try {
                            delete data.d[message.guild.id].chess[temp];
                        } catch (e) { console.log(e); }
                        return;
                    } else
                        t = ' Check.';
                }
                else {
                    if (g == 1) {
                        s = `Draw between ${chessdata.init}\nand ${chessdata.usr}.`;
                        if (chessdata.color)
                            await chessimg(chessdata.data, [p1, p2, r[0], r[1]], chessdata.extra, chessdata.usr.username, chessdata.init.username, 4, chessdata.taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                        else
                            await chessimg(chessdata.data, [p1, p2, r[0], r[1]], chessdata.extra, chessdata.init.username, chessdata.usr.username, 4, chessdata.taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                        let m = await message.channel.send({ content: s, files: [`${ddir}${message.id}.png`] });
                        fs.unlinkSync(`${ddir}${message.id}.png`);
                        chessgif(data.d[message.guild.id].chessusr[message.author.id], m);
                        let temp = JSON.parse(JSON.stringify(data.d[message.guild.id].chessusr[message.author.id]));
                        try {
                            delete data.d[message.guild.id].chessusr[chessdata.init.id];
                        } catch (e) { console.log(e); }
                        try {
                            delete data.d[message.guild.id].chessusr[chessdata.usr.id];
                        } catch (e) { console.log(e); }
                        try {
                            delete data.d[message.guild.id].chess[temp];
                        } catch (e) { console.log(e); }
                        return;
                    }
                }
                if (chessdata.color)
                    await chessimg(chessdata.data, [p1, p2, r[0], r[1]], chessdata.extra, chessdata.usr.username, chessdata.init.username, chessdata.turn, chessdata.taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                else
                    await chessimg(chessdata.data, [p1, p2, r[0], r[1]], chessdata.extra, chessdata.init.username, chessdata.usr.username, chessdata.turn, chessdata.taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                if (chessdata.turn == 1)
                    s += `It's ⬛`;
                else
                    s += `It's ⬜`;
                if ((chessdata.turn + chessdata.color) % 2) {
                    s += `${chessdata.usr}'s turn.`;
                }
                else {
                    s += `${chessdata.init}'s turn.`;
                }
                s += t;
                let sent = await message.channel.send({ content: s, files: [`${ddir}${message.id}.png`] });
                fs.renameSync(`${ddir}${data.d[message.guild.id].chessusr[message.author.id]}`, `${ddir}${sent.id}`);
                fs.unlinkSync(`${ddir}${message.id}.png`);
                data.d[message.guild.id].chess[sent.id] = JSON.parse(JSON.stringify(chessdata));
                data.d[message.guild.id].chess[sent.id].time = new Date().getTime();
                data.d[message.guild.id].chess[sent.id].channel = message.channel.id;
                data.d[message.guild.id].message[sent.id] = sent;
                delete data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]];
                data.d[message.guild.id].chessusr[chessdata.usr.id] = sent.id;
                data.d[message.guild.id].chessusr[chessdata.init.id] = sent.id;
                await client.users.fetch(data.d[message.guild.id].chess[sent.id].usr.id);
                await client.users.fetch(data.d[message.guild.id].chess[sent.id].init.id);
                data.d[message.guild.id].chess[sent.id].usr = client.users.cache.get(data.d[message.guild.id].chess[sent.id].usr.id);
                data.d[message.guild.id].chess[sent.id].init = client.users.cache.get(data.d[message.guild.id].chess[sent.id].init.id);
        }
    }
    else if (command == 'resign') {
        if (data.d[message.guild.id].chessusr[message.author.id] == undefined) {
            message.channel.send(`You do not have an active game,\n${message.author}.`);
            return;
        }
        //try{
        //    data.d[message.guild.id].message[data.d[message.guild.id].chessusr[message.author.id]].delete();
        //}catch(e){console.log(e);};
        if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id == message.author.id) {
            if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].color)
                await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, 2, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
            else
                await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, 3, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
            let m = await message.channel.send({ content: `The winner is ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr},\n${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init} resigned.`, files: [`${ddir}${message.id}.png`] });
            fs.unlinkSync(`${ddir}${message.id}.png`);
            chessgif(data.d[message.guild.id].chessusr[message.author.id], m);
        }
        else if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.id == message.author.id) {
            if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].color)
                await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, 3, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
            else
                await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, 2, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
            let m = await message.channel.send({ content: `The winner is ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init},\n${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr} resigned.`, files: [`${ddir}${message.id}.png`] });
            fs.unlinkSync(`${ddir}${message.id}.png`);
            chessgif(data.d[message.guild.id].chessusr[message.author.id], m);
        }
        try {
            delete data.d[message.guild.id].message[data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id]];
        } catch (e) { console.log(e); }
        let temp = JSON.parse(JSON.stringify(data.d[message.guild.id].chessusr[message.author.id]));
        try {
            delete data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[temp].usr.id];
        } catch (e) { console.log(e); }
        try {
            delete data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[temp].init.id];
        } catch (e) { console.log(e); }
        try {
            delete data.d[message.guild.id].chess[temp];
        } catch (e) { console.log(e); }
    }
    else if (command == 'draw' || command == 'd') {
        if (data.d[message.guild.id].chessusr[message.author.id] == undefined) {
            message.channel.send(`You do not have an active game,\n${message.author}.`);
            return;
        }
        if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id == message.author.id) {
            if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].draw[1] != 0) {
                if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].color)
                    await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, 4, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                else
                    await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, 4, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                let m = await message.channel.send({ content: `Draw between ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init}\nand ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr}.`, files: [`${ddir}${message.id}.png`] });
                fs.unlinkSync(`${ddir}${message.id}.png`);
                chessgif(data.d[message.guild.id].chessusr[message.author.id], m);
                try {
                    delete data.d[message.guild.id].message[data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id]];
                } catch (e) { console.log(e); }
                let temp = JSON.parse(JSON.stringify(data.d[message.guild.id].chessusr[message.author.id]));
                try {
                    delete data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[temp].usr.id];
                } catch (e) { console.log(e); }
                try {
                    delete data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[temp].init.id];
                } catch (e) { console.log(e); }
                try {
                    delete data.d[message.guild.id].chess[temp];
                } catch (e) { console.log(e); }
                return;
            }
            if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].draw[0] != 0) {
                message.channel.send(`You already offered a draw,\n${message.author}.`);
                return;
            }
            const r1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`da${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.id}`).setLabel('✓').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId(`dr${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.id}`).setLabel('✗').setStyle(ButtonStyle.Danger));
            let msg = await message.channel.send({ content: `${message.author} has offered you a draw, ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr}.\nDo you accept?`, components: [r1] });
            data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].draw[0] = msg.id;
            data.d[message.guild.id].message[msg.id] = msg;
        }
        else {
            if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].draw[0] != 0) {
                if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].color)
                    await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, 4, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                else
                    await chessimg(data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].data, [-1, -1, -1, -1], data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].extra, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.username, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr.username, 4, data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].taken, message.id, data.d[message.guild.id].chessusr[message.author.id], 1);
                let m = await message.channel.send({ content: `Draw between ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init}\nand ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].usr}.`, files: [`${ddir}${message.id}.png`] });
                fs.unlinkSync(`${ddir}${message.id}.png`);
                chessgif(data.d[message.guild.id].chessusr[message.author.id], m);
                try {
                    delete data.d[message.guild.id].message[data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id]];
                } catch (e) { console.log(e); }
                let temp = JSON.parse(JSON.stringify(data.d[message.guild.id].chessusr[message.author.id]));
                try {
                    delete data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[temp].usr.id];
                } catch (e) { console.log(e); }
                try {
                    delete data.d[message.guild.id].chessusr[data.d[message.guild.id].chess[temp].init.id];
                } catch (e) { console.log(e); }
                try {
                    delete data.d[message.guild.id].chess[temp];
                } catch (e) { console.log(e); }
                return;
            }
            if (data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].draw[1] != 0) {
                message.channel.send(`You already offered a draw,\n${message.author}.`);
                return;
            }
            const r1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`da${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id}`).setLabel('✓').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId(`dr${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init.id}`).setLabel('✗').setStyle(ButtonStyle.Danger));
            let msg = await message.channel.send({ content: `${message.author} has offered you a draw, ${data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].init}.\nDo you accept?`, components: [r1] });
            data.d[message.guild.id].chess[data.d[message.guild.id].chessusr[message.author.id]].draw[1] = msg.id;
            data.d[message.guild.id].message[msg.id] = msg;
        }
    }
    else if (command == 'ro' || command == 'rold') {
        let a = '1d2';
        let nice = '';
        let e = '';
        try {
            a = args.shift().toLowerCase();
        } catch (e) { };
        if (!a.includes('d'))
            a = '1d' + a;
        if (a.startsWith('d'))
            a = '1' + a;
        let b = a.split('d');
        if (b.length != 2) {
            message.channel.send(`Please enter a valid command using ${data.d[message.guild.id].prefix}r/roll ([n rolls]**d**)[n sides(+[add n])],\n${message.author}.`);
            return;
        }
        b[2] = 0;
        if (b[1].includes('+')) {
            let c = b[1].split('+');
            if (c.length != 2 || !/^\d+$/.test(c[0]) || !/^\d+$/.test(c[1])) {
                message.channel.send(`Please enter a valid command using ${data.d[message.guild.id].prefix}r/roll ([n rolls]**d**)[n sides(+[add n])],\n${message.author}.`);
                return;
            }
            b[1] = parseInt(c[0]);
            b[2] = parseInt(c[1]);
        }
        else if (b[1].includes('-')) {
            let c = b[1].split('-');
            if (c.length != 2 || !/^\d+$/.test(c[0]) || !/^\d+$/.test(c[1])) {
                message.channel.send(`Please enter a valid command using ${data.d[message.guild.id].prefix}r/roll ([n rolls]**d**)[n sides(+[add n])],\n${message.author}.`);
                return;
            }
            b[1] = parseInt(c[0]);
            b[2] -= parseInt(c[1]);
        }
        b[2] += 1;
        if (!/^\d+$/.test(b[0]) || !/^\d+$/.test(b[1])) {
            message.channel.send(`Please enter a valid command using ${data.d[message.guild.id].prefix}r/roll ([n rolls]**d**)[n sides(+[add n])],\n${message.author}.`);
            return;
        }
        if (b[0] > 1000000) {
            message.channel.send(`Please refrain from using more than 1M rolls,\n${message.author}.`);
            return;
        }
        if (b[1] > 1000000000000) {
            message.channel.send(`Please refrain from rolling more than 1T-sided dices,\n${message.author}.`);
            return;
        }
        if (b[0] < 1) {
            message.channel.send(`I did not roll the dice.`)
            return;
        }
        if (b[1] < 1) {
            message.channel.send(`I cannot roll a dice that does not exist.`)
            return;
        }
        b[1] == 42 || b[1] == 69 || b[1] == 420 ? nice = 'n' : nice = 'd';
        e = `${b[2] > 1 ? `(adding ${b[2] - 1}) ` : ''}`;
        e = `${b[2] < 1 ? `(subtracting ${b[2] - 1}) ` : e}`;
        if (b[0] > 100) {
            let r = 0;
            for (let i = 0; i < b[0]; i++) {
                r += random(b[1]) + b[2];
            }
            message.channel.send(`I rolled a ${b[1]} sided ${nice}ice ${b[0]} times ${e}and got\n**${r}**.`);
        }
        else {
            let r = 0;
            let s = [];
            for (let i = 0; i < b[0]; i++) {
                s.push(random(b[1]) + b[2]);
                r += s[i];
            }
            let s2 = s.join(' ');
            if (b[0] == 1)
                message.channel.send(`I rolled a ${b[1]} sided ${nice}ice ${e}and got\n**${r}**.`);
            else if (b[0] == 2)
                message.channel.send(`I rolled a ${b[1]} sided ${nice}ice twice ${e}and got\n${s2}\n-----\n**${r}**.`);
            else if (b[0] == 3)
                message.channel.send(`I rolled a ${b[1]} sided ${nice}ice thrice ${e}and got\n${s2}\n-----\n**${r}**.`);
            else
                message.channel.send(`I rolled a ${b[1]} sided ${nice}ice ${b[0]} times ${e}and got\n${s2}\n-----\n**${r}**.`);
        }
    }
    else if (command == 'r' || command == 'roll') {
        message.channel.send(roll(args.join("")));
    }
    else if (command == 'w' || command == 'welcome') {
        let a = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a command,\n${message.author}.`);
            return;
        }
        a = a.toLowerCase();
        switch (a) {
            case 's': case 'set':
                message.channel.send(`Set Channel for welcome-messages to ${message.channel}.`);
                wchan[message.guild.id] = message.channel;
                data.d[message.guild.id].wel = wchan[message.guild.id].id;
                break;
            case 'g': case 'get':
                message.channel.send(`Channel for welcome-messages is ${wchan[message.guild.id]}.`);
                break;
            default:
                message.channel.send(`Please specify a valid command,\n${message.author}.`);
                break;
        }
    }
    else if (command == 'xkcd' || command == 'x') {
        let a = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a command,\n${message.author}.`);
            return;
        }
        a = a.toLowerCase();
        switch (a) {
            case 's': case 'set':
                message.channel.send(`Set Channel for the latest xkcd to ${message.channel}.`);
                xchan[message.guild.id] = message.channel;
                data.d[message.guild.id].xk = xchan[message.guild.id].id;
                break;
            case 'g': case 'get':
                message.channel.send(`Channel for the latest xkcd is ${xchan[message.guild.id]}.`);
                break;
            default:
                if (!isNaN(parseInt(a)) || a == 'random' || a == 'r') {
                    let r;
                    let l;
                    if (parseInt(a) > 0) {
                        l = 'https://xkcd.com/' + a;
                    }
                    else if (a == 'random' || a == 'r') {
                        l = 'https://c.xkcd.com/random/comic/';
                    }
                    try {
                        r = await axios.get(l);
                    } catch (e) {
                        return message.channel.send('Error in fetching');
                    }
                    if (r == undefined || r.status != 200) {
                        return message.channel.send('Error in fetching');
                    } else {
                        let d = r.data;
                        let g = d.indexOf('<img src="//imgs.xkcd.com/comics');
                        let b = d.substring(d.indexOf('/', g), d.indexOf('" title="', g)).replace('//imgs.xkcd.com/comics/', '');
                        let c = d.substring(d.indexOf('" title="', g) + 9, d.indexOf('" alt="', d.indexOf('" title="', g) + 10)).replaceAll('&#39;', '\'');
                        let e = d.substring(d.indexOf('" alt="', g) + 7, d.indexOf('"', d.indexOf('" alt="', g) + 8));
                        let f = d.substring(d.indexOf('<meta property="og:url" content="') + 33, d.indexOf('">', d.indexOf('<meta property="og:url" content="') + 33));
                        const embed = new EmbedBuilder()
                            .setColor('#1a57f0')
                            .setTitle(e)
                            .setURL(f)
                            .setDescription(c)
                            .setImage('https://imgs.xkcd.com/comics/' + b)
                            .setFooter({ text: `#${f.replace('https://xkcd.com/', '').replace('/', '')}` })
                            .setTimestamp();
                        return message.channel.send({ embeds: [embed] });
                    }
                }
                message.channel.send(`Please specify a valid command,\n${message.author}.`);
                break;
        }
    }
    else if (command == 'epic' || command == 'e') {
        let a = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a command,\n${message.author}.`);
            return;
        }
        a = a.toLowerCase();
        switch (a) {
            case 's': case 'set':
                echan[message.guild.id] = message.channel;
                data.d[message.guild.id].epic = echan[message.guild.id].id;
                message.channel.send(`Set Channel for free games on EpicGames and Steam to ${message.channel}.`);
                break;
            case 'g': case 'get':
                message.channel.send(`Channel for free games on EpicGames and Steam is ${echan[message.guild.id]}.`);
                break;
            case 'p': case 'ping':
                if (data.d[message.guild.id].epicusr[message.author.id] == undefined) {
                    data.d[message.guild.id].epicusr[message.author.id] = message.author.id.toString();
                    message.channel.send(`Added ${message.author} to get pinged for free games on EpicGames and Steam.`);
                }
                else {
                    delete data.d[message.guild.id].epicusr[message.author.id];
                    message.channel.send(`${message.author} will not get pinged for free games on EpicGames and Steam.`);
                }
                break;
            case 'f': case 'force':
                if (message.author.id != conf.admin)
                    return;
                egfg.thisshouldneveroccurintheepicgamesapifreegames = 1;
                epic();
                message.channel.send("Edited Epic Buffer");
                break;
            default:
                message.channel.send(`Please specify a valid command,\n${message.author}.`);
                break;
        }
    }
    else if (command == 'mine' || command == 'minesweeper') {
        let a = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a valid width using ${data.d[message.guild.id].prefix}minesweeper [width] [height] [amount of mines],\n${message.author}.`);
            return;
        }
        a = a.toLowerCase();
        let b = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a valid heigth using ${data.d[message.guild.id].prefix}minesweeper [width] [height] [amount of mines],\n${message.author}.`);
            return;
        }
        b = b.toLowerCase();
        let c = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a valid amount of mines using ${data.d[message.guild.id].prefix}minesweeper [width] [height] [amount of mines],\n${message.author}.`);
            return;
        }
        c = c.toLowerCase();
        if (!/^\d+$/.test(a)) {
            message.channel.send(`Please specify a valid width using ${data.d[message.guild.id].prefix}minesweeper [width] [height] [amount of mines],\n${message.author}.`);
            return;
        }
        if (!/^\d+$/.test(b)) {
            message.channel.send(`Please specify a valid heigth using ${data.d[message.guild.id].prefix}minesweeper [width] [height] [amount of mines],\n${message.author}.`);
            return;
        }
        if (!/^\d+$/.test(c)) {
            message.channel.send(`Please specify a valid amount of mines using ${data.d[message.guild.id].prefix}minesweeper [width] [height] [amount of mines],\n${message.author}.`);
            return;
        }
        if (a * b < c) {
            message.channel.send(`Too many mines,\n${message.author}.\nThis response was provided by Github Copilot.`);
            return;
        }
        if (a > 25 || b > 25) {
            message.channel.send(`Too big,\n${message.author}.\nPlease use a widthand height of 25 or less.\nThis response was also completely provided by Github Copilot.`);
            return;
        }
        a = parseInt(a);
        b = parseInt(b);
        c = parseInt(c);
        let d = new Array();
        for (let i = 0; i < a * b; i++) {
            d.push(0);
        }
        for (let i = 0; i < c; i++) {
            let e = random(a * b);
            while (d[e] == -1) {
                e = random(a * b);
            }
            d[e] = -1;
        }
        for (let i = 0; i < d.length; i++) {
            if (d[i] == -1) {
                if (i % a != 0) {
                    if (d[i - 1] != -1) {
                        d[i - 1]++;
                    }
                    if (i - a - 1 >= 0) {
                        if (d[i - a - 1] != -1) {
                            d[i - a - 1]++;
                        }
                    }
                    if (i + a - 1 < d.length) {
                        if (d[i + a - 1] != -1) {
                            d[i + a - 1]++;
                        }
                    }
                }
                if (i % a != a - 1) {
                    if (d[i + 1] != -1) {
                        d[i + 1]++;
                    }
                    if (i - a + 1 >= 0) {
                        if (d[i - a + 1] != -1) {
                            d[i - a + 1]++;
                        }
                    }
                    if (i + a + 1 < d.length) {
                        if (d[i + a + 1] != -1) {
                            d[i + a + 1]++;
                        }
                    }
                }
                if (i - a >= 0) {
                    if (d[i - a] != -1) {
                        d[i - a]++;
                    }
                }
                if (i + a < d.length) {
                    if (d[i + a] != -1) {
                        d[i + a]++;
                    }
                }
            }
        }
        let s = '';
        let l = -a;
        s += `${a}x${b} Minesweeper with ${c} Mines:`;
        for (let i = 0; i < d.length; i++) {
            if (i % a == 0) {
                s += '\n';
                l += a;
                if ((l + a) % 99 < a) {
                    message.channel.send(s);
                    s = '';
                    l = 0;
                }
            }
            switch (d[i]) {
                case -1:
                    s += '||:bomb:||';
                    break;
                case 0:
                    s += '||:zero:||';
                    break;
                case 1:
                    s += '||:one:||';
                    break;
                case 2:
                    s += '||:two:||';
                    break;
                case 3:
                    s += '||:three:||';
                    break;
                case 4:
                    s += '||:four:||';
                    break;
                case 5:
                    s += '||:five:||';
                    break;
                case 6:
                    s += '||:six:||';
                    break;
                case 7:
                    s += '||:seven:||';
                    break;
                case 8:
                    s += '||:eight:||';
                    break;
            }
        }
        message.channel.send(s);
        if (c > 25) {
            let q = '';
            let p = 0;
            s = '';
            for (let i = 0; i < a; i++) {
                let e = 0;
                for (let j = 0; j < b; j++) {
                    if (d[i + j * a] == -1) {
                        e++;
                    }
                }
                switch (e % 10) {
                    case 0:
                        s += '||:zero:||';
                        break;
                    case 1:
                        s += '||:one:||';
                        break;
                    case 2:
                        s += '||:two:||';
                        break;
                    case 3:
                        s += '||:three:||';
                        break;
                    case 4:
                        s += '||:four:||';
                        break;
                    case 5:
                        s += '||:five:||';
                        break;
                    case 6:
                        s += '||:six:||';
                        break;
                    case 7:
                        s += '||:seven:||';
                        break;
                    case 8:
                        s += '||:eight:||';
                        break;
                    case 9:
                        s += '||:nine:||';
                        break;
                }
                switch ((e - (e % 10)) / 10) {
                    case 0:
                        q += '||:zero:||';
                        break;
                    case 1:
                        q += '||:one:||';
                        p++;
                        break;
                    case 2:
                        q += '||:two:||';
                        p++;
                        break;
                    case 3:
                        q += '||:three:||';
                        p++;
                        break;
                    case 4:
                        q += '||:four:||';
                        p++;
                        break;
                    case 5:
                        q += '||:five:||';
                        p++;
                        break;
                    case 6:
                        q += '||:six:||';
                        p++;
                        break;
                    case 7:
                        q += '||:seven:||';
                        p++;
                        break;
                    case 8:
                        q += '||:eight:||';
                        p++;
                        break;
                    case 9:
                        q += '||:nine:||';
                        p++;
                        break;
                }
            }
            if (p > 0) {
                s = `Checksums for each column:\n${q}\n${s}`;
            }
            else {
                s = `Checksums for each column:\n${s}`;
            }
            message.channel.send(s);
        }
    }
    else if (command == '8ball' || command == '8') {
        if (args.length < 1) {
            message.channel.send(`You need to ask a question after the command.\n${message.author}`)
                .then(async msg => {
                    await sleep(10000);
                    msg.delete();
                });
            return;
        }
        let a = random(20);
        let b = '';
        switch (a) {
            case 0:
                b = ':green_circle: It is certain.';
                break;
            case 1:
                b = ':green_circle: It is decidedly so.';
                break;
            case 2:
                b = ':green_circle: Without a doubt.';
                break;
            case 3:
                b = ':green_circle: Yes – definitely.';
                break;
            case 4:
                b = ':green_circle: You may rely on it.';
                break;
            case 5:
                b = ':green_circle: As I see it, yes.';
                break;
            case 6:
                b = ':green_circle: Most likely.';
                break;
            case 7:
                b = ':green_circle: Outlook good.';
                break;
            case 8:
                b = ':green_circle: Yes.';
                break;
            case 9:
                b = ':green_circle: Signs point to yes.';
                break;
            case 10: case 11:
                b = ':yellow_circle: Reply hazy, try again.';
                break;
            case 12: case 13:
                b = ':yellow_circle: Ask again later.';
                break;
            case 14: case 15:
                b = ':yellow_circle: Better not tell you now.';
                break;
            case 16: case 17:
                b = ':yellow_circle: Cannot predict now.';
                break;
            case 18: case 19:
                b = ':yellow_circle: Concentrate and ask again.';
                break;
            case 20: case 21:
                b = ':red_circle: Don’t count on it.';
                break;
            case 22: case 23:
                b = ':red_circle: My reply is no.';
                break;
            case 24: case 25:
                b = ':red_circle: My sources say no.';
                break;
            case 26: case 27:
                b = ':red_circle: Outlook not so good.';
                break;
            case 28: case 29:
                b = ':red_circle: Very doubtful.';
                break;
        }
        message.channel.send(b);
    }
    else if (command == 'fortune' || command == 'f') {
        const f = fs.readFileSync('./fortune.txt', 'utf8');
        let r = 0;
        f.split(/\r?\n/).forEach(line => {
            r++;
        });
        r = random(r);
        f.split(/\r?\n/).forEach(line => {
            if (!r)
                message.channel.send(line);
            r--;
        });
    }
    else if (command == 'wiki') {
        message.channel.send('No Memory to eat :'()); //mem eater lel
        return;
        let a = args.shift();
        if (a == undefined) {
            message.channel.send(`Please specify a Wiki you want to search in,\n${message.author}.`);
            return;
        }
        a = a.toLowerCase();
        let l = '';
        let m = '';
        let s = '';
        let b = '';
        let c = '';
        let r = '';
        let t = '';
        if (a.length == 2) {
            t = a;
            a = args.shift();
            if (a == undefined) {
                message.channel.send(`Please specify a Wiki you want to search in,\n${message.author}.`);
                return;
            }
            a = a.toLowerCase();
        }
        else {
            t = 'en';
        }
        switch (a) {
            case 'wikipedia':
                l = `${t}.wikipedia.org/w`;
                m = `${t}.wikipedia.org`;
                b = args;
                if (b == undefined) {
                    message.channel.send(`Please specify a Search Term,\n${message.author}.`);
                    return;
                }
                s = b;
                break;
            case 'fandom':
                b = args.shift();
                if (b == undefined) {
                    message.channel.send(`Please specify a Fandom,\n${message.author}.`);
                    return;
                }
                b = b.toLowerCase();
                c = args;
                if (c == undefined) {
                    message.channel.send(`Please specify a Search Term,\n${message.author}.`);
                    return;
                }
                s = c;
                l = `${b}.fandom.com/${t}`;
                m = `${b}.fandom.com/${t}`;
                r = await axios.get(`https://${l}/`);
                if (r.status == 404) {
                    message.channel.send(`The Fandom you specified does not exist,\n${message.author}.`);
                    return;
                }
                break;
            default:
                l = `${t}.wikipedia.org/w`;
                m = `${t}.wikipedia.org`;
                b = args;
                b.unshift(a);
                if (b == undefined) {
                    message.channel.send(`Please specify a Search Term,\n${message.author}.`);
                    return;
                }
                s = b;
                break;
        }
        let res = '';
        try {
            res = await axios.get(`https://${l}/api.php?action=query&list=search&srsearch=${s}&format=json`);
        } catch (e) { };
        if (res == undefined || res == '' || res.status == 404) {
            message.channel.send(`The Wiki you specified does not exist in that language,\n${message.author}.\n(listing available Languages coming soon:tm:)`);
            return;
        }
        if (res.data.query.search.length == 0) {
            let o = '';
            while (s.length > 0) {
                o += s.shift();
                if (s.length > 0)
                    o += ' ';
            }
            message.channel.send(`No results found for ${o},\n${message.author}.\nMaybe try a different language${a == 'fandom' ? ' or Fandom' : ''}?`);
            return;
        }
        let resid = res.data.query.search[0].pageid.toString();
        delete res;
        let res2 = await axios.get(`https://${l}/api.php?action=query&prop=revisions&pageids=${resid}&rvslots=*&rvprop=content&formatversion=2&format=json`);
        let d = '';
        try {
            d = parsewiki(res2.data.query.pages[0].revisions[0].slots.main.content, m);
        } catch (e) {
            message.channel.send(`Error in parsing wiki-page to embed,\n${message.author}.\nCertain pages may contain content the parser cannot handle yet, sorry.`);
            return;
        }
        const emb = new EmbedBuilder()
            .setColor('#1a57f0')
            .setTitle(res2.data.query.pages[0].title.toString())
            .setURL(`https://${m}/wiki/${res2.data.query.pages[0].title.replace(/ /g, '_')}`)
            .setDescription(d)
            .setFooter({ text: m });
        message.channel.send({ content: ':warning:This feature is still a work in progress!', embeds: [emb] });
    }
    else if (command == 'help' || command == 'h') {
        if (args[0] == 'play' || args[0] == 'p' || args[0] == 'player') {
            message.channel.send(`i forgor 💀,\n${message.author}.`);
            return;
        }
        if (args[0] == 'r' || args[0] == 'roll') {
            const embed = new EmbedBuilder()
                .setColor('#1a57f0')
                .setTitle('Rolling Dice:')
                .addFields(
                    { name: 'General', value: `The features are mostly from [Dice Maiden](<https://github.com/Humblemonk/DiceMaiden>) and [Foundry](<https://foundryvtt.com/article/dice-modifiers/>), it processes from left to right (case and space insensitive).` },
                    { name: 'Basic Syntax', value: `x **t** y **d** z processes the entire thing x times.\nUse any modifiers after that.` },
                    { name: 'Advanced Syntax', value: `The explode, reroll and success/failure modifiers all support adding he/>=, h/>, le/<=, l/< (nothing is ==) and a number after them.` },
                    { name: 'Infinite', value: `VAL: **i**xx\nAdding i before explode or reroll makes it iterate **i**nfinitely-ish.` },
                    { name: 'Explode', value: `VAL: **e**\nIf the conditions after **e** are met, another roll is made.` },
                    { name: 'Reroll', value: `VAL: **r**\nIf the conditions after **r** are met, the throw is re**r**olled.` },
                    { name: 'Keep / Drop', value: `VAL: **k**/**kh**, **kl**, **dl**, **dh**\n**D**rops or **k**eeps the **h**ighest or **l**owest throws.` },
                    { name: 'Min / Max', value: `VAL: **min**,**max**\nMakes every throw either higher than the **min**inimum or/and lower than the **max**imum.` },
                    { name: 'Even / Odd', value: `VAL: **ev**/**even**, **od**/**odd**\nCounts the amount of **even**/**odd** number.` },
                    { name: 'Count', value: `VAL: **cs**,**cf**\n**C**ounts **s**uccesses and/or **f**ailures according to the conditions after it.` },
                    { name: 'Subtract / Deduct Failures', value: `VAL: **sf**, **df**\n**D**educt (-1) or **s**ubtract every failed value.` },
                    { name: 'Output:', value: `normal, **success**, __failure__, ~~discarded~~.` }
                );
            message.channel.send({ embeds: [embed] });
            return;
        }
        const embed = new EmbedBuilder()
            .setColor('#1a57f0')
            .setTitle('Currently aviable commands:\n[] = required, () = optional')
            .addFields(
                { name: 'Help', value: `Use ${data.d[message.guild.id].prefix}help/${data.d[message.guild.id].prefix}h to show this message.` },
                { name: 'TicTacToe', value: `Initiate a game with ${data.d[message.guild.id].prefix}tictactoe/${data.d[message.guild.id].prefix}ttt/${data.d[message.guild.id].prefix}3 followed by pinging the opponent.` },
                { name: 'Connect 4', value: `Initiate a game with ${data.d[message.guild.id].prefix}connect4/${data.d[message.guild.id].prefix}4win/${data.d[message.guild.id].prefix}4 followed by pinging the opponent.` },
                { name: 'Chess', value: `Initiate a game with ${data.d[message.guild.id].prefix}chess/${data.d[message.guild.id].prefix}2 followed by pinging the opponent.\nUse ${data.d[message.guild.id].prefix}move/${data.d[message.guild.id].prefix}m [move from] [move to] to move your pieces.\nUse ${data.d[message.guild.id].prefix}resign to resign your game and ${data.d[message.guild.id].prefix}draw/${data.d[message.guild.id].prefix}d to offer a draw.` },
                { name: 'Roll Dices Old', value: `Use ${data.d[message.guild.id].prefix}rold/${data.d[message.guild.id].prefix}ro ([n times]**d**)[n sides(+[add n])] to roll some dices.\nPlease note that not every value will have the same likelyhood of occuring and not all values can be gotten above 4294967295.` },
                { name: 'Roll Dices Premium', value: `Use ${data.d[message.guild.id].prefix}roll/${data.d[message.guild.id].prefix}r [syntax] to roll some better dices. Use ${data.d[message.guild.id].prefix}help r/roll to find out more` },
                { name: '8Ball', value: `Use ${data.d[message.guild.id].prefix}8ball/${data.d[message.guild.id].prefix}8 followed by a question to get a response.` },
                { name: 'Fortune Cookie', value: `Use ${data.d[message.guild.id].prefix}fortune/${data.d[message.guild.id].prefix}f to get a fortune cookie.` },
                { name: 'MineSweeper', value: `Use ${data.d[message.guild.id].prefix}minesweeper/${data.d[message.guild.id].prefix}mine [width] [height] [amount of mines] to start a game.` },
                { name: 'xkcd Feed', value: `Use ${data.d[message.guild.id].prefix}xkcd/${data.d[message.guild.id].prefix}x set/s in the desired channel to have the latest xckd comic posted there.\nUse ${data.d[message.guild.id].prefix}xkcd/${data.d[message.guild.id].prefix}x get/g to get the channel they are posted in.` },
                { name: 'Free Games', value: `Use ${data.d[message.guild.id].prefix}epic/${data.d[message.guild.id].prefix}e ping/p to get pinged for free games.\nUse ${data.d[message.guild.id].prefix}epic/${data.d[message.guild.id].prefix}e set/s in the desired channel to have free games on EpicGames and Steam posted there.\nUse ${data.d[message.guild.id].prefix}epic/${data.d[message.guild.id].prefix}e get/g to get the channel they are posted in.` },
                { name: 'Welcome Message', value: `Use ${data.d[message.guild.id].prefix}welcome/${data.d[message.guild.id].prefix}w set/s in the desired channel to have Welcome-messages posted there.\nUse ${data.d[message.guild.id].prefix}welcome/${data.d[message.guild.id].prefix}w get/g to get the channel they are posted in.` },
                { name: 'Wikis', value: `Use ${data.d[message.guild.id].prefix}wiki (language) (wikipedia/fandom [fandom name]) [search term] to search for a wiki page.\nThis feature is still a work in progress.` }
            );
        message.channel.send({ embeds: [embed] });
    }
    else {
        message.channel.send(`The command you specified does not exist, ${message.author}.\nUse ${data.d[message.guild.id].prefix}help to see all commands.`);
    }
})
client.on('interactionCreate', async i => {
    log.write(`${i.member.user.username}#${i.member.user.discriminator} [${i.customId}] in ${i.channel.name}#${i.channel.id} at ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(i.createdTimestamp))}: (${i.message?.id}) ${i.message?.content}\n`);
    if (i.isChatInputCommand()) {
        const c = i.client.commands.get(i.commandName);
        if (!c) {
            console.log(`${i.commandName} not found`);
            return;
        }
        try {
            await c.execute(i);
        } catch (e) {
            console.log(e);
            await i.reply({ content: 'Error rip lmao', ephemeral: true });
        }
    }
    else if (i.isButton()) {
        try {
            await i.deferUpdate();
        } catch (e) {
            console.log(e);
        }
        const a = i.customId.charAt(0).toString();
        let b;
        let s = '';
        let c;
        switch (a) {
            case 'a':
                b = Number.parseInt(i.customId.charAt(1).toString());
                if (data.d[i.guild.id].ttt == undefined) return;
                if (data.d[i.guild.id].ttt[i.message.id] == undefined) return;
                if (i.member.user.id != data.d[i.guild.id].ttt[i.message.id].usr.id && i.member.user.id != data.d[i.guild.id].ttt[i.message.id].init.id) return;
                if (b == 9) {
                    const r1 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '0').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '1').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '2').setDisabled(true));
                    const r2 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '3').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '4').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '5').setDisabled(true));
                    const r3 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '6').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '7').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '8').setDisabled(true));
                    if (i.member.user.id == data.d[i.guild.id].ttt[i.message.id].usr.id)
                        i.message.edit({ content: `The winner is ${data.d[i.guild.id].ttt[i.message.id].init},\n${data.d[i.guild.id].ttt[i.message.id].usr} resigned.`, components: [r1, r2, r3] });
                    if (i.member.user.id == data.d[i.guild.id].ttt[i.message.id].init.id)
                        i.message.edit({ content: `The winner is ${data.d[i.guild.id].ttt[i.message.id].usr},\n${data.d[i.guild.id].ttt[i.message.id].init} resigned.`, components: [r1, r2, r3] });
                    delete data.d[i.guild.id].ttt[i.message.id];
                    return;
                }
                if (data.d[i.guild.id].ttt[i.message.id].turn == 0) {
                    if (i.member.user.id != data.d[i.guild.id].ttt[i.message.id].init.id)
                        return;
                }
                else {
                    if (i.member.user.id != data.d[i.guild.id].ttt[i.message.id].usr.id)
                        return;
                }
                if (data.d[i.guild.id].ttt[i.message.id].data.d[b] != 0)
                    return;
                data.d[i.guild.id].ttt[i.message.id].data.d[b] = data.d[i.guild.id].ttt[i.message.id].turn + 1;
                c = await checkttt(data.d[i.guild.id].ttt[i.message.id].data);
                if (c == '9') {
                    const r1 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '0').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '1').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '2').setDisabled(true));
                    const r2 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '3').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '4').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '5').setDisabled(true));
                    const r3 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '6').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '7').setDisabled(true), setttt(data.d[i.guild.id].ttt[i.message.id].data, '8').setDisabled(true));
                    i.message.edit({ content: `Draw between ${data.d[i.guild.id].ttt[i.message.id].init}\nand ${data.d[i.guild.id].ttt[i.message.id].usr}.`, components: [r1, r2, r3] });
                    delete data.d[i.guild.id].ttt[i.message.id];
                    return;
                }
                if (c != '0') {
                    let d = [true, true, true, true, true, true, true, true, true];
                    switch (c) {
                        case '1': d[0] = false; d[1] = false; d[2] = false; break;
                        case '2': d[3] = false; d[4] = false; d[5] = false; break;
                        case '3': d[6] = false; d[7] = false; d[8] = false; break;
                        case '4': d[0] = false; d[3] = false; d[6] = false; break;
                        case '5': d[1] = false; d[4] = false; d[7] = false; break;
                        case '6': d[2] = false; d[5] = false; d[8] = false; break;
                        case '7': d[0] = false; d[4] = false; d[8] = false; break;
                        case '8': d[2] = false; d[4] = false; d[6] = false; break;
                    }
                    const r1 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '0').setDisabled(d[0]), setttt(data.d[i.guild.id].ttt[i.message.id].data, '1').setDisabled(d[1]), setttt(data.d[i.guild.id].ttt[i.message.id].data, '2').setDisabled(d[2]));
                    const r2 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '3').setDisabled(d[3]), setttt(data.d[i.guild.id].ttt[i.message.id].data, '4').setDisabled(d[4]), setttt(data.d[i.guild.id].ttt[i.message.id].data, '5').setDisabled(d[5]));
                    const r3 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '6').setDisabled(d[6]), setttt(data.d[i.guild.id].ttt[i.message.id].data, '7').setDisabled(d[7]), setttt(data.d[i.guild.id].ttt[i.message.id].data, '8').setDisabled(d[8]));
                    if (data.d[i.guild.id].ttt[i.message.id].turn == 0)
                        i.message.edit({ content: `${data.d[i.guild.id].ttt[i.message.id].init} won against\n${data.d[i.guild.id].ttt[i.message.id].usr}.`, components: [r1, r2, r3] });
                    else
                        i.message.edit({ content: `${data.d[i.guild.id].ttt[i.message.id].usr} won against\n${data.d[i.guild.id].ttt[i.message.id].init}.`, components: [r1, r2, r3] });
                    delete data.d[i.guild.id].ttt[i.message.id];
                    return;
                }
                const r1 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '0'), setttt(data.d[i.guild.id].ttt[i.message.id].data, '1'), setttt(data.d[i.guild.id].ttt[i.message.id].data, '2'), new ButtonBuilder().setCustomId('a9').setLabel('🏳️').setStyle(ButtonStyle.Danger));
                const r2 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '3'), setttt(data.d[i.guild.id].ttt[i.message.id].data, '4'), setttt(data.d[i.guild.id].ttt[i.message.id].data, '5'));
                const r3 = new ActionRowBuilder().addComponents(setttt(data.d[i.guild.id].ttt[i.message.id].data, '6'), setttt(data.d[i.guild.id].ttt[i.message.id].data, '7'), setttt(data.d[i.guild.id].ttt[i.message.id].data, '8'));
                data.d[i.guild.id].ttt[i.message.id].turn = (data.d[i.guild.id].ttt[i.message.id].turn + 1) % 2;
                if (!data.d[i.guild.id].ttt[i.message.id].turn) {
                    s += `It's ⭕${data.d[i.guild.id].ttt[i.message.id].init}'s turn.`;
                }
                else {
                    s += `It's ❌${data.d[i.guild.id].ttt[i.message.id].usr}'s turn.`;
                }
                i.message.edit({ content: s, components: [r1, r2, r3] });
                data.d[i.guild.id].ttt[i.message.id].time = new Date().getTime();
                break;
            case 'b':
                b = Number.parseInt(i.customId.charAt(1).toString());
                if (data.d[i.guild.id].con == undefined) return;
                if (data.d[i.guild.id].con[i.message.id] == undefined) return;
                if (i.member.user.id != data.d[i.guild.id].con[i.message.id].usr.id && i.member.user.id != data.d[i.guild.id].con[i.message.id].init.id) return;
                if (b == 7) {
                    if (i.member.user.id == data.d[i.guild.id].con[i.message.id].usr.id)
                        s += `The winner is ${data.d[i.guild.id].con[i.message.id].init},\n${data.d[i.guild.id].con[i.message.id].usr} resigned.`;
                    else if (i.member.user.id == data.d[i.guild.id].con[i.message.id].init.id)
                        s += `The winner is ${data.d[i.guild.id].con[i.message.id].usr},\n${data.d[i.guild.id].con[i.message.id].init} resigned.`;
                    s += '\n```\n| 1  2  3  4  5  6  7|';
                    for (let j = 0; j < 42; j++) {
                        if (j % 7 == 0)
                            s += '\n|';
                        switch (data.d[i.guild.id].con[i.message.id].data.d[j]) {
                            case 0:
                                s += '  |';
                                break;
                            case 1:
                                s += ' o|';
                                break;
                            case 2:
                                s += ' x|';
                                break;
                        }
                    }
                    s += '\n```';
                    i.message.edit({ content: s, components: [] });
                    delete data.d[i.guild.id].con[i.message.id];
                    return;
                }
                if (data.d[i.guild.id].con[i.message.id].turn == 0) {
                    if (i.member.user.id != data.d[i.guild.id].con[i.message.id].init.id)
                        return;
                }
                else {
                    if (i.member.user.id != data.d[i.guild.id].con[i.message.id].usr.id)
                        return;
                }
                if (data.d[i.guild.id].con[i.message.id].data.d[b] != 0)
                    return;
                for (let it = 0; it < 6; it++) {
                    let d = 35 + b - it * 7;
                    if (data.d[i.guild.id].con[i.message.id].data.d[d] == 0) {
                        data.d[i.guild.id].con[i.message.id].data.d[d] = data.d[i.guild.id].con[i.message.id].turn + 1;
                        break;
                    }
                }
                c = await checkcon(data.d[i.guild.id].con[i.message.id].data);
                data.d[i.guild.id].con[i.message.id].turn = (data.d[i.guild.id].con[i.message.id].turn + 1) % 2;
                switch (c[0]) {
                    case 0:
                        if (data.d[i.guild.id].con[i.message.id].turn == 0)
                            s += `It's ⭕${data.d[i.guild.id].con[i.message.id].init}'s turn.`;
                        else
                            s += `It's ❌${data.d[i.guild.id].con[i.message.id].usr}'s turn.`;
                        s += '\n```\n| 1  2  3  4  5  6  7|';
                        for (let j = 0; j < 42; j++) {
                            if (j % 7 == 0)
                                s += '\n|';
                            switch (data.d[i.guild.id].con[i.message.id].data.d[j]) {
                                case 0:
                                    s += '  |';
                                    break;
                                case 1:
                                    s += '⭕|';
                                    break;
                                case 2:
                                    s += '❌|';
                                    break;
                            }
                        }
                        s += '\n```';
                        const r1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('b0').setLabel('1').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b1').setLabel('2').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b2').setLabel('3').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b3').setLabel('4').setStyle(ButtonStyle.Secondary));
                        const r2 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('b4').setLabel('5').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b5').setLabel('6').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b6').setLabel('7').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('b7').setLabel('🏳️').setStyle(ButtonStyle.Danger));
                        i.message.edit({ content: s, components: [r1, r2] });
                        data.d[i.guild.id].con[i.message.id].time = new Date().getTime();
                        break;
                    case 1:
                        if (data.d[i.guild.id].con[i.message.id].turn)
                            s += `${data.d[i.guild.id].con[i.message.id].init} won against\n${data.d[i.guild.id].con[i.message.id].usr}.`;
                        else
                            s += `${data.d[i.guild.id].con[i.message.id].usr} won against\n${data.d[i.guild.id].con[i.message.id].init}.`;
                        s += '\n```\n| 1  2  3  4  5  6  7|';
                        for (let j = 0; j < 42; j++) {
                            if (j % 7 == 0)
                                s += '\n|';
                            if (j == c[1] || j == c[2] || j == c[3] || j == c[4])
                                switch (data.d[i.guild.id].con[i.message.id].data.d[j]) {
                                    case 1:
                                        s += '⭕|';
                                        break;
                                    case 2:
                                        s += '❌|';
                                        break;
                                }
                            else
                                switch (data.d[i.guild.id].con[i.message.id].data.d[j]) {
                                    case 0:
                                        s += '  |';
                                        break;
                                    case 1:
                                        s += ' o|';
                                        break;
                                    case 2:
                                        s += ' x|';
                                        break;
                                }
                        }
                        s += '\n```';
                        i.message.edit({ content: s, components: [] });
                        delete data.d[i.guild.id].con[i.message.id];
                        break;
                    case 2:
                        s += `Draw between ${data.d[i.guild.id].con[i.message.id].init}\nand ${data.d[i.guild.id].con[i.message.id].usr}.`;
                        s += '\n```\n| 1  2  3  4  5  6  7|';
                        for (let j = 0; j < 42; j++) {
                            if (j % 7 == 0)
                                s += '\n|';
                            switch (data.d[i.guild.id].con[i.message.id].data.d[j]) {
                                case 0:
                                    s += '  |';
                                    break;
                                case 1:
                                    s += ' o|';
                                    break;
                                case 2:
                                    s += ' x|';
                                    break;
                            }
                        }
                        s += '\n```';
                        i.message.edit({ content: s, components: [] });
                        delete data.d[i.guild.id].con[i.message.id];
                        break;
                }
                break;
            case 'd':
                b = i.customId.toString().replace('da', '').replace('dr', '');
                b = parseInt(b);
                if (i.member.user.id != b) return;
                if (data.d[i.guild.id].chessusr == undefined || data.d[i.guild.id].chessusr[i.member.user.id] == undefined) {
                    i.message.edit({ content: 'This draw offer is deprecated.', components: [] });
                    return;
                }
                if (i.customId.charAt(1).toString() == 'a') {
                    i.message.edit({ content: 'The draw offer was accepted.', components: [] });
                    if (data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].color)
                        await chessimg(data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].data, [-1, -1, -1, -1], data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].extra, data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].usr.username, data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].init.username, 4, data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].taken, i.message.id, data.d[i.guild.id].chessusr[i.member.user.id], 1);
                    else
                        await chessimg(data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].data, [-1, -1, -1, -1], data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].extra, data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].init.username, data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].usr.username, 4, data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].taken, i.message.id, data.d[i.guild.id].chessusr[i.member.user.id], 1);
                    let m = await i.message.channel.send({ content: `Draw between ${data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].init}\nand ${data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].usr}.`, files: [`${ddir}${i.message.id}.png`] });
                    fs.unlinkSync(`${ddir}${i.message.id}.png`);
                    chessgif(data.d[i.guild.id].chessusr[i.member.user.id], m);
                    try {
                        delete data.d[i.guild.id].message[data.d[i.guild.id].chessusr[data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].init.id]];
                    } catch (e) { console.log(e); }
                    let temp = JSON.parse(JSON.stringify(data.d[i.guild.id].chessusr[i.member.user.id]));
                    try {
                        delete data.d[i.guild.id].chessusr[data.d[i.guild.id].chess[temp].usr.id];
                    } catch (e) { console.log(e); }
                    try {
                        delete data.d[i.guild.id].chessusr[data.d[i.guild.id].chess[temp].init.id];
                    } catch (e) { console.log(e); }
                    try {
                        delete data.d[i.guild.id].chess[temp];
                    } catch (e) { console.log(e); }
                    delete data.d[i.guild.id].message[i.message.id];
                }
                if (i.customId.charAt(1).toString() == 'r') {
                    i.message.edit({ content: 'The draw offer was rejected.', components: [] });
                    if (data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].init.id == i.member.user.id)
                        data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].draw[2] = 1;
                    if (data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].usr.id == i.member.user.id)
                        data.d[i.guild.id].chess[data.d[i.guild.id].chessusr[i.member.user.id]].draw[3] = 1;
                }
                break;
            case 'e':
                b = i.customId.charAt(1).toString();
                if (b == 'p') {
                    if (data.d[i.guild.id].epicusr[i.member.user.id] == undefined) {
                        data.d[i.guild.id].epicusr[i.member.user.id] = i.member.user.id.toString();
                        i.followUp({ content: 'You will now get pinged for free games', ephemeral: true });
                    }
                    else {
                        delete data.d[i.guild.id].epicusr[i.member.user.id];
                        i.followUp({ content: 'You will not get pinged for free games', ephemeral: true });
                    }
                }
                break;
        }
    }
});

function roll(a) {
    let b = a.toString();
    if (a.includes(":"))
        return "do not the dice";
    a = a.replaceAll("-", ":-").replaceAll("*", ":*").replaceAll("/", ":/").replaceAll("+", ":+");
    let ser = "";
    let it = 1;
    if (a.includes("t")) {
        let b = a.split("t");
        it = parseInt(b[0]);
        a = b[1];
        if (isNaN(it) || it < 1)
            return "i did not the dice";
    }
    if (it > 64)
        return "do not the dice, use the old roll";
    a = "+" + a;
    a = a.split(":");
    for (let j = 0; j < it; j++)
        ser += rull(a);
    return `[${b.replaceAll("*", "\\*")}]\n${ser}`;
}

function rull(a) {
    let str = "";
    let rs = 0;
    for (let jk = 0; jk < a.length; jk++) {
        let op = '+';
        op = a[jk][0];
        let c = [...a[jk].substring(1).replaceAll("ev", "ev1").replaceAll("even", "ev1").replaceAll("od", "od1").replaceAll("odd", "od1").matchAll(/[a-z=<>]+\d+/g)]; //not elegant but whatever
        let b = 0;
        let amt = 0;
        let sid = 1;
        let ii = 1;
        let cs = false;
        let cff = false;
        let df = false;
        let sf = false;
        amt = a[jk].match(/^[+\-*\/]\d+/g)[0].substring(1);
        if (c.length == 0) {
            jk == 0 ? str += `[${amt}] ` : str += `${op == "*" ? "\\*" : op} [${amt}] `;
            rs = eval(rs + op + amt);
            continue;
        }
        let res = [];
        let sta = []; //-2 drop -1 fail 0 1 succ
        for (let k = 0; k < c.length; k++) {
            ev = '==';
            let d = c[k][0].match(/[a-z=<>]+/g)[0];
            let e = parseInt(c[k][0].match(/\d+/g)[0]);
            if (e > 4294967295)
                e = 4294967295;
            if (d.startsWith('i')) {
                ii = 1000;
                d = d.substring(1);
            }
            if (!d.startsWith("dl") && !d.startsWith("dh") && !d.startsWith("k")) {
                if (d.endsWith("he") || d.endsWith(">=")) {
                    ev = ">=";
                    d = d.substring(0, d.length - 2);
                }
                if (d.endsWith("le") || d.endsWith("<=")) {
                    ev = "<=";
                    d = d.substring(0, d.length - 2);
                }
                if (d.endsWith("h") || d.endsWith(">")) {
                    ev = ">";
                    d = d.substring(0, d.length - 1);
                }
                if (d.endsWith("l") || d.endsWith("<")) {
                    ev = "<";
                    d = d.substring(0, d.length - 1);
                }
            }
            switch (d) {
                case 'd':
                    sid = e;
                    for (let i = 0; i < amt; i++) {
                        res.push(random(sid) + 1);
                        sta.push(0);
                    }
                    break;
                case 'e':
                    let i = 0;
                    for (let j = 0; j < ii; j++) {
                        b = 0;
                        if (i == res.length)
                            continue;
                        for (; i < res.length; i++)
                            if (eval(res[i] + ev + e)) {
                                b++;
                            }
                        for (let i = 0; i < b; i++) {
                            res.push(random(sid) + 1);
                            sta.push(0);
                        }
                    }
                    break;
                case 'k': case 'kh':
                    e = res.length - e;
                case 'dl':
                    if (e > res.length)
                        e = res.length;
                    for (let i = 0; i < e; i++) {
                        sta[find(1, res, sta)] = -2;
                    }
                    break;
                case 'kl':
                    e = res.length - e;
                case 'dh':
                    if (e > res.length)
                        e = res.length;
                    for (let i = 0; i < e; i++) {
                        sta[find(0, res, sta)] = -2;
                    }
                    break;
                case 'r':
                    for (let j = 0; j < ii; j++) {
                        b = 0;
                        for (let i = 0; i < res.length; i++)
                            if (eval(res[i] + ev + e)) {
                                res[i] = random(sid);
                                b++;
                            }
                        if (b == 0)
                            continue;
                    }
                    break;
                case 'min':
                    if (e <= sid)
                        for (let i = 0; i < res.length; i++)
                            if (res[i] <= e)
                                res[i] = e;
                    break;
                case 'max':
                    if (e > 0)
                        for (let i = 0; i < res.length; i++)
                            if (res[i] >= e)
                                res[i] = e;
                    break;
                case 'cs':
                    cs = true;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = 1;
                        }
                    break;
                case 'ev':
                    cs = true;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (res[i] % 2)
                                sta[i] = 1;
                        }
                    break;
                case 'od':
                    cs = true;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (!res[i] % 2)
                                sta[i] = 1;
                        }
                    break;
                case 'cf':
                    cff = true;
                    df = false;
                    sf = false;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = -1;
                        }
                    break;
                case 'sf':
                    sf = true;
                    df = false;
                    cff = false;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = -1;
                        }
                    break;
                case 'df':
                    df = true;
                    sf = false;
                    cff = false;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = -1;
                        }
                    break;
                default:
                    break;
            }
        }
        jk == 0 ? str += `[` : str += `${op == "*" ? "\\*" : op} [`;
        let rss = 0;
        for (let i = 0; i < res.length; i++) {
            switch (sta[i]) {
                case -2:
                    str += `~~${res[i]}~~, `;
                    break;
                case -1:
                    str += `__${res[i]}__, `;
                    if (cff)
                        rss++;
                    if (sf)
                        rss -= res[i];
                    if (df)
                        rss--;
                    break;
                case 1:
                    str += `**${res[i]}**, `;
                    if (cs)
                        rss++;
                    else
                        rss += res[i];
                    break;
                default:
                    str += `${res[i]}, `;
                    if (!cs && !cff)
                        rss += res[i];
                    break;
            }
        }
        if (res.length == 0)
            str += 0;
        str += `] `;
        str = str.replace(", ]", "]");
        rs = eval(rs + op + rss);
    }
    return str + `= ${rs}\n`;
}

function find(a, b, sta) {
    let c = 0;
    let d = 0;
    if (a) {
        d = Infinity;
        for (let i = 0; i < b.length; i++) {
            if (sta[i] != -2 && b[i] < d) {
                c = i;
                d = b[i];
            }
        }
    }
    else {
        for (let i = 0; i < b.length; i++) {
            if (sta[i] != -2 && b[i] > d) {
                c = i;
                d = b[i];
            }
        }
    }
    return c;
}

function checkmate(a, b, f) {
    let d, e = 0;
    if (b) {
        d = 6; e = 13;
    }
    else {
        d = 0; e = 7;
    }
    for (let i = 0; i < 64; i++) {
        if (a[i] > d && a[i] < e) {
            for (let j = 0; j < 64; j++) {
                if (chessmove(a, i, j, b, f) == 2) {
                    let c = JSON.parse(JSON.stringify(a));
                    let g = JSON.parse(JSON.stringify(f));
                    if (c[j] == 0)
                        if (c[i] == 1 || c[i] == 7) {
                            if (i - j == 7 || i - j == 9)
                                c[j + 8] = 0;
                            if (j - i == 7 || j - i == 9)
                                c[j - 8] = 0;
                        }
                    c[j] = parseInt(c[i]);
                    c[i] = 0;
                    g[i] += 1;
                    g.fill(0, 8, 15);
                    g.fill(0, 48, 55);
                    if (i > 7 && i < 16 && j > 23 && j < 32)
                        g[i] = 1;
                    if (i > 47 && i < 56 && j > 31 && j < 40)
                        g[i] = 1;
                    if (chesscheck(c, b, g) == -1) {
                        //console.log(c, b, g); sometimes buggy like wtf
                        return 0;
                    }
                }
            }
        }
    }
    return 1;
}

function chesscheck(a, b, f) {
    let k = -1;
    for (let i = 0; i < 64; i++) {
        if (a[i] == 6 + b * 6)
            k = i;
    }
    for (let i = 0; i < 64; i++) {
        let t = chessmove(a, i, k, (b + 1) % 2, f);
        if (t == 2) {
            return k;
        }
    }
    return -1;
}

function chessmove(a, b, c, d, e) {
    if (b == c)
        return 1;
    if (a[b] == 0)
        return 0;
    if (d == 1) {
        if (a[b] > 0 && a[b] < 7)
            return 0;
        if (a[c] > 6 && a[c] < 13)
            return 1;
    }
    if (d == 0) {
        if (a[b] > 6 && a[b] < 13)
            return 0;
        if (a[c] > 0 && a[c] < 7)
            return 1;
    }
    let br = 8 - (b - (b % 8)) / 8;
    let cr = 8 - (c - (c % 8)) / 8;
    switch (a[b]) {
        case 1:
            if (br == 2 && b == c + 16 && a[c] == 0 && a[c + 8] == 0)
                return 2;
            if (b == c + 8 && a[c] == 0)
                return 2;
            if (b % 8 != 7 && b == c + 7)
                if (a[c] != 0 || e[c - 8] == 1)
                    return 2;
            if (b % 8 != 0 && b == c + 9)
                if (a[c] != 0 || e[c - 8] == 1)
                    return 2;
            break;
        case 2: case 8:
            if (br < 7 && b % 8 < 7 && c == b - 15)
                return 2;
            if (br < 8 && b % 8 < 6 && c == b - 6)
                return 2;
            if (br > 1 && b % 8 < 6 && c == b + 10)
                return 2;
            if (br > 2 && b % 8 < 7 && c == b + 17)
                return 2;
            if (br > 2 && b % 8 > 0 && c == b + 15)
                return 2;
            if (br > 1 && b % 8 > 1 && c == b + 6)
                return 2;
            if (br < 8 && b % 8 > 1 && c == b - 10)
                return 2;
            if (br < 7 && b % 8 > 0 && c == b - 17)
                return 2;
            break;
        case 3: case 9:
            if (Math.abs(cr - br) == Math.abs(c % 8 - b % 8)) {
                let v = - (cr - br) / Math.abs(cr - br);
                let h = (c % 8 - b % 8) / Math.abs(c % 8 - b % 8);
                for (let i = b + v * 8 + h; i != c; i += v * 8 + h) {
                    if (a[i] != 0)
                        return 1;
                }
                return 2;
            }
            break;
        case 4: case 10:
            if (cr == br) {
                if ((c - b) > 0) {
                    for (let i = b + 1; i < c; i++)
                        if (a[i] != 0)
                            return 1;
                }
                else {
                    for (let i = b - 1; i > c; i--)
                        if (a[i] != 0)
                            return 1;
                }
                return 2;
            }
            if (b % 8 == c % 8) {
                if ((cr - br) < 0) {
                    for (let i = b + 8; i < c; i += 8)
                        if (a[i] != 0)
                            return 1;
                }
                else {
                    for (let i = b - 8; i > c; i -= 8)
                        if (a[i] != 0)
                            return 1;
                }
                return 2;
            }
            break;
        case 5: case 11:
            if (cr == br) {
                if ((c - b) > 0) {
                    for (let i = b + 1; i < c; i++)
                        if (a[i] != 0)
                            return 1;
                }
                else {
                    for (let i = b - 1; i > c; i--)
                        if (a[i] != 0)
                            return 1;
                }
                return 2;
            }
            if (b % 8 == c % 8) {
                if ((cr - br) < 0) {
                    for (let i = b + 8; i < c; i += 8)
                        if (a[i] != 0)
                            return 1;
                }
                else {
                    for (let i = b - 8; i > c; i -= 8)
                        if (a[i] != 0)
                            return 1;
                }
                return 2;
            }
            if (Math.abs(cr - br) == Math.abs(c % 8 - b % 8)) {
                let v = - (cr - br) / Math.abs(cr - br);
                let h = (c % 8 - b % 8) / Math.abs(c % 8 - b % 8);
                for (let i = b + v * 8 + h; i != c; i += v * 8 + h) {
                    if (a[i] != 0)
                        return 1;
                }
                return 2;
            }
            break;
        case 6: case 12:
            if (Math.abs(br - cr) < 2 && Math.abs(b % 8 - c % 8) < 2)
                return 2;
            if (e[b] == 0 && b % 8 == 4)
                if (br == 1 || br == 8) {
                    if (br == cr && c == b + 2 && a[b + 1] == 0 && a[b + 2] == 0 && e[b + 3] == 0) {
                        let g = JSON.parse(JSON.stringify(a));
                        let f = JSON.parse(JSON.stringify(e));
                        g[b + 1] = g[b];
                        g[b] = 0;
                        if (chesscheck(g, d, f) == -1)
                            return 2;
                    }
                    if (br == cr && c == b - 2 && a[b - 1] == 0 && a[b - 2] == 0 && a[b - 3] == 0 && e[b - 4] == 0) {
                        let g = JSON.parse(JSON.stringify(a));
                        let f = JSON.parse(JSON.stringify(e));
                        g[b - 1] = g[b];
                        g[b] = 0;
                        if (chesscheck(g, d, f) == -1)
                            return 2;
                    }
                }
            break;
        case 7:
            if (br == 7 && b == c - 16 && a[c] == 0 && a[c - 8] == 0)
                return 2;
            if (b == c - 8 && a[c] == 0)
                return 2;
            if (b % 8 != 7 && b == c - 9)
                if (a[c] != 0 || e[c + 8] == 1)
                    return 2;
            if (b % 8 != 0 && b == c - 7)
                if (a[c] != 0 || e[c + 8] == 1)
                    return 2;
    }
    return 1;
}

async function chessimg(a, b, e, f, g, h, j, k, m, n) {
    let c = new Array(2).fill(-1);
    c[0] = chesscheck(a, 0, e);
    c[1] = chesscheck(a, 1, e);
    const canvas = createCanvas(1152, 1152);
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < 64; i++) {
        if ((1 + i + ((i - (i % 8)) / 8) % 2) % 2) {
            ctx.fillStyle = '#ffffff';
            if (i == b[0] || i == b[1] || i == b[2] || i == b[3])
                ctx.fillStyle = '#00ff60';
        }
        else {
            ctx.fillStyle = '#0093ff';
            if (i == b[0] || i == b[1] || i == b[2] || i == b[3])
                ctx.fillStyle = '#1c8a46';
        }
        if (i == c[0] || i == c[1])
            ctx.fillStyle = '#ff0000';
        ctx.fillRect((i % 8) * 128, (i - (i % 8)) * 16, 128, 128);
    }
    ctx.font = '24pt "Noto Sans"';
    let o = [b[0], b[1], b[2], b[3], c[0], c[1]];
    for (let i = 0; i < 8; i++) {
        if (i % 2)
            ctx.fillStyle = '#ffffff';
        else
            ctx.fillStyle = '#0093ff';
        for (let j = 0; j < o.length; j++) {
            if (o[j] == 63 - i)
                ctx.fillStyle = '#000000';
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${String.fromCharCode(72 - i)}`, 1008 - i * 128, 1008);
    }
    for (let i = 0; i < 8; i++) {
        if (i % 2)
            ctx.fillStyle = '#ffffff';
        else
            ctx.fillStyle = '#0093ff';
        for (let j = 0; j < o.length; j++) {
            if (o[j] == i * 8)
                ctx.fillStyle = '#000000';
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${8 - i}`, 12, i * 128 + 16);
    }
    for (let i = 0; i < 64; i++) {
        if (a[i] != 0) {
            switch (a[i]) {
                case 1: ctx.drawImage(c1, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 2: ctx.drawImage(c2, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 3: ctx.drawImage(c3, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 4: ctx.drawImage(c4, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 5: ctx.drawImage(c5, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 6: ctx.drawImage(c6, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 7: ctx.drawImage(c7, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 8: ctx.drawImage(c8, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 9: ctx.drawImage(c9, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 10: ctx.drawImage(c10, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 11: ctx.drawImage(c11, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
                case 12: ctx.drawImage(c12, (i % 8) * 128, (i - (i % 8)) * 16, 128, 128); break;
            }
        }
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 1024, 512, 128);
    ctx.fillStyle = '#000000';
    ctx.fillRect(512, 1024, 512, 128);
    ctx.font = '48pt "Noto Sans"';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(f, 8, 1088);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText(g, 1016, 1088);
    ctx.fillStyle = '#1a57f0';
    ctx.fillRect(1024, 0, 128, 1024);
    ctx.drawImage(c18, 1024, 1024, 128, 128);
    let l = 0;
    for (let i = 0; i < 6; i++) {
        if (j[i] > 0) {
            for (let k = 0; k < j[i]; k++) {
                switch (i) {
                    case 0: ctx.drawImage(c1, 1024, l, 64, 64); break;
                    case 1: ctx.drawImage(c2, 1088, l, 64, 64); break;
                    case 2: ctx.drawImage(c3, 1088, l, 64, 64); break;
                    case 3: ctx.drawImage(c4, 1088, l, 64, 64); break;
                    case 4: ctx.drawImage(c5, 1088, l, 64, 64); break;
                    case 5: ctx.drawImage(c6, 1088, l, 64, 64); break;
                }
                l += 32;
            }
            l += 24;
            if (i == 0)
                l = 0;
        }
    }
    l = 1016;
    for (let i = 0; i < 6; i++) {
        if (j[i + 6] > 0) {
            l -= j[i + 6] * 32 + 24;
            let m = l;
            for (let k = 0; k < j[i + 6]; k++) {
                switch (i) {
                    case 0: ctx.drawImage(c7, 1024, m, 64, 64); break;
                    case 1: ctx.drawImage(c8, 1088, m, 64, 64); break;
                    case 2: ctx.drawImage(c9, 1088, m, 64, 64); break;
                    case 3: ctx.drawImage(c10, 1088, m, 64, 64); break;
                    case 4: ctx.drawImage(c11, 1088, m, 64, 64); break;
                    case 5: ctx.drawImage(c12, 1088, m, 64, 64); break;
                }
                m += 32;
            }
            if (i == 0)
                l = 1016;
        }
    }
    const canv = createCanvas(1152, 1152);
    const ct = canv.getContext('2d');
    ct.drawImage(canvas, 0, 0);
    switch (h) {
        case 0:
            ctx.drawImage(c13, 448, 1024, 128, 128); break;
        case 1:
            ctx.drawImage(c14, 448, 1024, 128, 128); break;
        case 2:
            ctx.drawImage(c15, 448, 1024, 128, 128); break;
        case 3:
            ctx.drawImage(c16, 448, 1024, 128, 128); break;
        case 4:
            ctx.drawImage(c17, 448, 1024, 128, 128); break;
    }
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`${ddir}${k}.png`, buffer);
    if (n == 0)
        ct.drawImage(c17, 448, 1024, 128, 128);
    else
        switch (h) {
            case 0:
                ct.drawImage(c14, 448, 1024, 128, 128); break;
            case 1:
                ct.drawImage(c13, 448, 1024, 128, 128); break;
            case 2:
                ct.drawImage(c15, 448, 1024, 128, 128); break;
            case 3:
                ct.drawImage(c16, 448, 1024, 128, 128); break;
            case 4:
                ct.drawImage(c17, 448, 1024, 128, 128); break;
        }
    const buf = canv.toBuffer('image/png');
    fs.writeFileSync(`${ddir}${m}/${k}.png`, buf);
}

async function chessgif(a, b) {
    let msg = await b.reply({ content: 'Rendering gif...' });
    const GIFEncoder = require('gifencoder');
    let c = fs.readdirSync(`${ddir}${a}`);
    let encoder = new GIFEncoder(1152, 1152);
    encoder.createReadStream().pipe(fs.createWriteStream(`${ddir}${a}.gif`));
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1500);
    encoder.setQuality(10);
    const canvas = createCanvas(1152, 1152);
    const ctx = canvas.getContext('2d');
    let f = 0;
    console.log(c);
    for (let e of c) {
        console.log(e);
        await sleep(f);
        let d = await loadImage(`${ddir}${a}/${e}`);
        await sleep(f);
        ctx.drawImage(d, 0, 0, 1152, 1152);
        await sleep(f);
        encoder.addFrame(ctx);
    }
    encoder.addFrame(ctx);
    encoder.addFrame(ctx);
    encoder.addFrame(ctx);
    encoder.addFrame(ctx);
    encoder.finish();
    await sleep(100);
    await b.reply({ files: [`${ddir}${a}.gif`] });
    msg.delete();
    fs.unlinkSync(`${ddir}${a}.gif`);
    fs.rmSync(`${ddir}${a}`, { recursive: true, force: true });
    return;
}

async function checkttt(a) {
    for (let i = 0; i < 3; i++) {
        if (a[0 + i * 3] != 0 && a[0 + i * 3] === a[1 + i * 3] && a[1 + i * 3] === a[2 + i * 3])
            return `${i + 1}`;
    }
    for (let i = 0; i < 3; i++) {
        if (a[0 + i] != 0 && a[0 + i] === a[3 + i] && a[3 + i] === a[6 + i])
            return `${i + 4}`;
    }
    if (a[0] != 0 && a[0] === a[4] && a[4] === a[8])
        return `7`;
    if (a[2] != 0 && a[2] === a[4] && a[4] === a[6])
        return `8`;
    for (let i = 0; i < 9; i++) {
        if (a[i] == 0)
            return `0`;
    }
    return `9`;
}

function setttt(b, a) {
    if (b[a] == 0) {
        return new ButtonBuilder().setCustomId('a' + a)
            .setLabel('.').setStyle(ButtonStyle.Secondary);
    }
    if (b[a] == 1) {
        return new ButtonBuilder().setCustomId('a' + a)
            .setLabel('⭕').setStyle(ButtonStyle.Primary);
    }
    if (b[a] == 2) {
        return new ButtonBuilder().setCustomId('a' + a)
            .setLabel('❌').setStyle(ButtonStyle.Success);
    }
}

async function checkcon(a) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            if (a[i + j * 7] != 0 && a[i + j * 7] == a[1 + i + j * 7] && a[1 + i + j * 7] == a[2 + i + j * 7] && a[2 + i + j * 7] == a[3 + i + j * 7]) {
                return [1, i + j * 7, 1 + i + j * 7, 2 + i + j * 7, 3 + i + j * 7];
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            if (a[i + j * 7] != 0 && a[i + j * 7] == a[7 + i + j * 7] && a[7 + i + j * 7] == a[14 + i + j * 7] && a[14 + i + j * 7] == a[21 + i + j * 7]) {
                return [1, i + j * 7, 7 + i + j * 7, 14 + i + j * 7, 21 + i + j * 7];
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (a[i + j * 7] != 0 && a[i + j * 7] == a[8 + i + j * 7] && a[8 + i + j * 7] == a[16 + i + j * 7] && a[16 + i + j * 7] == a[24 + i + j * 7]) {
                return [1, i + j * 7, 8 + i + j * 7, 16 + i + j * 7, 24 + i + j * 7];
            }
        }
    }
    for (let i = 3; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            if (a[i + j * 7] != 0 && a[i + j * 7] == a[6 + i + j * 7] && a[6 + i + j * 7] == a[12 + i + j * 7] && a[12 + i + j * 7] == a[18 + i + j * 7]) {
                return [1, i + j * 7, 6 + i + j * 7, 12 + i + j * 7, 18 + i + j * 7];
            }
        }
    }
    for (let i = 0; i < 42; i++) {
        if (a[i] == 0)
            return [0];
    }
    return [2];
}

function parsewiki(a, s) {
    while (a.includes('<sup>')) {
        let d = a.indexOf('<sup>');
        let e = a.indexOf('</sup>');
        let f = '';
        for (let i = d + 5; i < e; i++) {
            f += sup[a[i]] || a[i];
        }
        f = f.replace(/\n\n:/g, '').replace(/'''''/g, '').replace(/'''/g, '').replace(/''/g, '').replace(/====/g, '').replace(/===/g, '').replace(/==/g, '');
        a = a.substring(0, d) + f + a.substring(e + 6);
    }
    while (a.includes('<sub>')) {
        let d = a.indexOf('<sub>');
        let e = a.indexOf('</sub>');
        let f = '';
        for (let i = d + 5; i < e; i++) {
            f += sub[a[i]] || a[i];
        }
        f = f.replace(/\n\n:/g, '').replace(/'''''/g, '').replace(/'''/g, '').replace(/''/g, '').replace(/====/g, '').replace(/===/g, '').replace(/==/g, '');
        a = a.substring(0, d) + f + a.substring(e + 6);
    }
    while (a.includes('<math>')) {
        let d = a.indexOf('<math>');
        let e = a.indexOf('</math>');
        a = a.substring(0, d) + '~~maths~~' + a.substring(e + 7);
    }
    while (a.includes('<')) {
        let d = a.indexOf('<');
        let e = a.indexOf('</');
        let f = a.indexOf('>', e);
        a = a.substring(0, d) + a.substring(f + 1);
    }
    while (a.includes('{{')) {
        let d = a.indexOf('{{');
        let e = a.indexOf('}}');
        while (a.indexOf('{{', d + 1) < e && a.indexOf('{{', d + 1) != -1) {
            d = a.indexOf('{{', d + 1);
        }
        a = a.substring(0, d) + a.substring(e + 2);
    }
    a = a.substring(0, 5000);
    a += ']]';
    while (a.includes('[[')) {
        let d = a.indexOf('[[');
        let e = a.indexOf(']]');
        while (a.indexOf('[[', d + 1) < e && a.indexOf('[[', d + 1) != -1) {
            d = a.indexOf('[[', d + 1);
        }
        if (a.substring(d + 2, e).includes('|') && a.substring(a.substring(d + 2, e).indexOf('|') + d + 3, e).includes('|')) {
            a = a.substring(0, d) + a.substring(e + 2);
        }
        else {
            if (a.substring(d + 2, e).startsWith('#')) {
                //add link before #
            }
            if (a.substring(d + 2, e).includes('|')) {
                let f = a.indexOf('|', d + 2);
                a = a.substring(0, d) + '[' + a.substring(f + 1, e + 1) + `(https://${s}/wiki/${a.substring(d + 2, f).replace(/ /g, '_')})` + a.substring(e + 2);
            }
            else {
                a = a.substring(0, d) + a.substring(d + 1, e + 1) + `(https://${s}/wiki/${a.substring(d + 2, e).replace(/ /g, '_')})` + a.substring(e + 2);
            }
        }
    }
    if (a.endsWith(']]')) {
        a = a.substring(0, a.length - 2);
    }
    a = a.replace(/\n\n:/g, '').replace(/'''''/g, '***').replace(/'''/g, '**').replace(/''/g, '*').replace(/====/g, '_').replace(/===/g, '__').replace(/==/g, '___');
    if (a.length > 4003) {
        a = a.substring(0, 4000);
        a += '...';
    }
    return a;
}

async function xkcd() {
    let r;
    try {
        try {
            r = await axios.get('https://xkcd.com/atom.xml');
        } catch (e) {
            throw Error(e);
        };
    } catch (e) {
        //when elon says more code = more good
    };
    if (r != undefined && r.status == 200) {
        const parser = new XMLParser();
        let res = parser.parse(r.data);
        res.feed.entry[0].sum = res.feed.entry[0].summary.replace('<img src="', '<img>').replace('" title="', '</img><title>').replace('" alt="', '</title><alt>').replace('" />', '</alt>');
        if (data.xkcd == undefined)
            data.xkcd = '';
        if (data.xkcd != res.feed.updated) {
            const id = res.feed.entry[0].id.replace('https://xkcd.com/', '').replace('/', '');
            const embed = new EmbedBuilder()
                .setColor('#1a57f0')
                .setTitle(res.feed.entry[0].title.toString().replaceAll("&quot;", '"'))
                .setURL(res.feed.entry[0].id)
                .setDescription(res.feed.entry[0].summary.substring(res.feed.entry[0].summary.indexOf(" title=") + 8, res.feed.entry[0].summary.indexOf(" alt=") - 1).replaceAll("&quot;", '"'))
                .setImage(res.feed.entry[0].summary.substring(res.feed.entry[0].summary.indexOf("img src=") + 9, res.feed.entry[0].summary.indexOf(" title=") - 1).replaceAll("&quot;", '"'))
                .setFooter({ text: `#${id}` })
                .setTimestamp();
            for (let guild in data.d) {
                if (xchan[guild] != undefined)
                    xchan[guild].send({ embeds: [embed] });
            }
            data.xkcd = res.feed.updated;
        }
    }
}

async function epic() {
    let r;
    try {
        r = await axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions');
    } catch (e) { return; };
    if (r != undefined && r.status == 200) {
        if (JSON.stringify(r.data) != JSON.stringify(egfg)) {
            egfg = r.data;
            let date = new Date();
            let c = 0;
            let d = 0;
            let emb = [];
            let emc = [];
            r.data.data.Catalog.searchStore.elements.forEach(i => {
                let s;
                let e;
                let f = 0;
                try {
                    s = new Date(i.promotions.promotionalOffers[0].promotionalOffers[0].startDate);
                    e = new Date(i.promotions.promotionalOffers[0].promotionalOffers[0].endDate);
                } catch (e) { f = 1; };
                if (f == 0 && s < date && e > date && i.price?.totalPrice?.discountPrice == 0) {//}) && i.price.totalPrice.discount > 0) { epig games api trippin wtf
                    let t = i.title;
                    let u = i.catalogNs?.mappings == undefined || i.catalogNs?.mappings[0]?.pageSlug == undefined ? i.productSlug : i.catalogNs.mappings[0].pageSlug;
                    let o = i.price?.totalPrice?.originalPrice;
                    let n = i.price?.totalPrice?.discountPrice;
                    let k = i.keyImages[1]?.url;
                    let l = i.description;
                    let m = [t, s, e, u, o, n, k, l];
                    if (games.epic.now.length > 0)
                        games.epic.now.forEach(i => {
                            if (JSON.stringify(i) == JSON.stringify(m))
                                f = 1;
                        });
                    if (f == 0) {
                        games.epic.now[games.epic.now.length] = m;
                        emb[c] = new EmbedBuilder()
                            .setColor('#1a57f0')
                            .setThumbnail('https://static-assets-prod.epicgames.com/epic-store/static/favicon.ico')
                            .setTitle(t)
                            .setURL('https://store.epicgames.com/p/' + u)
                            .setDescription(`~~${(o / 100).toFixed(2)}$~~ ${(n / 100).toFixed(2)}$ until ${e ? new Intl.DateTimeFormat('en-DE', { dateStyle: 'full', timeStyle: 'short' }).format(e) : 'it\'s not free anymore'}`)
                            .setImage(k)
                            .setFooter({ text: `${l}` });
                        c++;
                    }
                }
                f = 0;
                try {
                    s = new Date(i.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate);
                    e = new Date(i.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].endDate);
                } catch (e) { f = 1; };
                if (f == 0 && s > date && e > date) {
                    let n = i.title;
                    let o = [n, s, e];
                    if (games.epic.up.length > 0)
                        games.epic.up.forEach(i => {
                            if (JSON.stringify(i) == JSON.stringify(o))
                                f = 1;
                        });
                    if (f == 0) {
                        games.epic.up[games.epic.up.length] = o;
                        emc[d] = i.title;
                        emc[d + 1] = s;
                        d += 2;
                    }
                }
            });
            if (d > 0) {
                emb[c] = new EmbedBuilder()
                    .setColor('#1a57f0')
                    .setTitle('Upcoming:');
                for (let i = 0; i < d; i += 2) {
                    let ema = new Date(emc[i + 1]);
                    emb[c].addFields({ name: emc[i], value: `${ema ? new Intl.DateTimeFormat('en-DE', { dateStyle: 'full', timeStyle: 'short' }).format(ema) : 'at some point'}` });
                }
                c += 1;
            }
            const k = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ep').setLabel('PING').setStyle(ButtonStyle.Success).setDisabled(false));
            if (c > 0) {
                for (let guild in data.d) {
                    if (echan[guild] != undefined) {
                        let q = '';
                        if (c > 1) {
                            let g = Object.values(data.d[guild].epicusr);
                            for (let i = 0; i < g.length; i++)
                                q += `<@${g[i]}> `;
                        }
                        if (emb.length > 0)
                            if (q == '')
                                echan[guild].send({ embeds: emb, components: [k] });
                            else
                                echan[guild].send({ content: q, embeds: emb, components: [k] });
                    }
                }
                let h = Object.values(data.epicuser);
                h.forEach(async function (i) {
                    await client.users.fetch(i);
                    let us = client.users.cache.get(i);
                    us.send({ embeds: emb }).catch(console.error);
                });
            }
        }
    }
    fs.writeFileSync(ef, JSON.stringify(egfg, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

async function steam() {
    let r;
    try {
        r = await axios.get('https://store.steampowered.com/search/?maxprice=free&specials=1');
        //debug r = await axios.get('https://store.steampowered.com/search/?term=factorio&tags=599%2C597%2C21%2C492%2C9%2C19');
    } catch (e) { return; };
    if (r != undefined && r.status == 200) {
        let stea = r.data;
        let c = 0;
        let emb = [];
        let a = stea.indexOf('https://store.steampowered.com', 1);
        while (a >= 0) {
            let l = stea.substring(a, stea.indexOf('?', a) < stea.indexOf('"', a) ? stea.indexOf('?', a) : stea.indexOf('"', a));
            let d = l.match(/\d+/g);
            let i;
            switch (l.substring(31, l.indexOf('/', 31))) {
                case 'bundle':
                    i = `https://cdn.akamai.steamstatic.com/steam/subs/${d}/header_586x192.jpg`;
                    break;
                case 'app':
                    i = `https://cdn.akamai.steamstatic.com/steam/apps/${d}/header.jpg`;
                case 'sub':
                case 'bundle':
                    let b = stea.indexOf('title', a);
                    let t = stea.substring(b + 7, stea.indexOf('<', b + 8));
                    t = t.replace('&amp;', '&');
                    b = stea.indexOf('€', a);
                    let p = parseInt(stea.substring(b - 5, b + 1).replace(',', '').match(/\d+/g)) / 100; //steam does not always list on results :/ may be fixed by going to the respective site
                    let f = [0, 0];
                    games.steam.forEach(j => {
                        if (j[0] == l) {
                            if (new Date().getTime() - j[1] > 172800000) {
                                f[0] = 1;
                            }
                            f[1] = 1;
                            j[1] = new Date().getTime();
                        }
                    });
                    if (f[1] == 0) {
                        games.steam[games.steam.length] = [l, new Date().getTime()];
                    }
                    if (f[1] == 0 || f[0] == 1) {
                        emb[c] = new EmbedBuilder()
                            .setColor('#1a57f0')
                            .setTitle(t)
                            .setURL(l)
                            .setDescription(`~~${p}€~~ 0,00€`)
                            .setImage(i);
                        c++;
                    }
                    break;
                default:
                    break;
            }
            a = stea.indexOf('https://store.steampowered.com', a + 1);
        }
        const k = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ep').setLabel('PING').setStyle(ButtonStyle.Success).setDisabled(false));
        if (c > 0) {
            for (let guild in data.d) {
                if (echan[guild] != undefined) {
                    let q = '';
                    let g = Object.values(data.d[guild].epicusr);
                    for (let i = 0; i < g.length; i++)
                        q += `<@${g[i]}> `;
                    if (emb.length > 0)
                        if (q == '')
                            echan[guild].send({ embeds: emb, components: [k] });
                        else
                            echan[guild].send({ content: q, embeds: emb, components: [k] });
                }
            }
            let h = Object.values(data.epicuser);
            h.forEach(async function (i) {
                await client.users.fetch(i);
                let us = client.users.cache.get(i);
                us.send({ embeds: emb }).catch(console.error);
            });
        }
    }
}

setTimeout(async function () {
    steam();
    setInterval(async function () {
        steam();
    }, 60000);
}, 20000);

setTimeout(async function () {
    epic();
    setInterval(async function () {
        epic();
    }, 60000);
}, 40000);

setTimeout(async function () {
    xkcd();
    setInterval(async function () {
        xkcd();
    }, 60000);
}, 60000);

setInterval(async function () {
    let t = new Date().getTime();
    for (let guild in data.d) {
        for (let j in data.d[guild]) {
            if (j == 'ttt' || j == 'con' || j == 'chess')
                for (let i in data.d[guild][j]) {
                    let a = 0;
                    let m = await client.channels.fetch(data.d[guild][j][i].channel);
                    m = await m.messages.fetch(i);
                    if (j == 'chess')
                        a = (data.d[guild][j][i].turn + data.d[guild][j][i].color) % 2;
                    else
                        a = data.d[guild][j][i].turn;
                    if (data.d[guild][j][i].time + 600000 < t && data.d[guild][j][i].time + 660000 > t) {
                        m.reply(`${a ? data.d[guild][j][i].usr : data.d[guild][j][i].init}: Please continue the game!`);
                    }
                    if (data.d[guild][j][i].time + 18000000 < t && data.d[guild][j][i].time + 1860000 > t) {
                        m.reply(`${a ? data.d[guild][j][i].usr : data.d[guild][j][i].init}: You should continue the game!`);
                    }
                    if (data.d[guild][j][i].time + 3600000 < t && data.d[guild][j][i].time + 3660000 > t) {
                        m.reply(`${a ? data.d[guild][j][i].usr : data.d[guild][j][i].init}: Will you continue the game?`);
                    }
                    if (data.d[guild][j][i].time + 7200000 < t) {
                        m.reply(`${a ? data.d[guild][j][i].usr : data.d[guild][j][i].init}: Guess what? You didn't continue the game!`);
                        switch (j) {
                            case 'ttt':
                                const r1 = new ActionRowBuilder().addComponents(setttt(data.d[guild].ttt[m.id].data, '0').setDisabled(true), setttt(data.d[guild].ttt[m.id].data, '1').setDisabled(true), setttt(data.d[guild].ttt[m.id].data, '2').setDisabled(true));
                                const r2 = new ActionRowBuilder().addComponents(setttt(data.d[guild].ttt[m.id].data, '3').setDisabled(true), setttt(data.d[guild].ttt[m.id].data, '4').setDisabled(true), setttt(data.d[guild].ttt[m.id].data, '5').setDisabled(true));
                                const r3 = new ActionRowBuilder().addComponents(setttt(data.d[guild].ttt[m.id].data, '6').setDisabled(true), setttt(data.d[guild].ttt[m.id].data, '7').setDisabled(true), setttt(data.d[guild].ttt[m.id].data, '8').setDisabled(true));
                                if (data.d[guild].ttt[i].turn)
                                    m.edit({ content: `The winner is ${data.d[guild].ttt[m.id].init},\n${data.d[guild].ttt[m.id].usr} timed out.`, components: [r1, r2, r3] });
                                if (!data.d[guild].ttt[i].turn)
                                    m.edit({ content: `The winner is ${data.d[guild].ttt[m.id].usr},\n${data.d[guild].ttt[m.id].init} timed out.`, components: [r1, r2, r3] });
                                delete data.d[guild].ttt[m.id];
                                break;
                            case 'con':
                                let s = '';
                                if (data.d[guild].con[i].turn)
                                    s += `The winner is ${data.d[guild].con[m.id].init},\n${data.d[guild].con[m.id].usr} timed out.`;
                                else if (!data.d[guild].con[i].turn)
                                    s += `The winner is ${data.d[guild].con[m.id].usr},\n${data.d[guild].con[m.id].init} timed out.`;
                                s += '\n```\n| 1  2  3  4  5  6  7|';
                                for (let j = 0; j < 42; j++) {
                                    if (j % 7 == 0)
                                        s += '\n|';
                                    switch (data.d[guild].con[m.id].data.d[guild][j]) {
                                        case 0:
                                            s += '  |';
                                            break;
                                        case 1:
                                            s += ' o|';
                                            break;
                                        case 2:
                                            s += ' x|';
                                            break;
                                    }
                                }
                                s += '\n```';
                                m.edit({ content: s, components: [] });
                                delete data.d[guild].con[m.id];
                                break;
                            case 'chess':
                                if (!a) {
                                    if (data.d[guild].chess[i].color)
                                        await chessimg(data.d[guild].chess[i].data, [-1, -1, -1, -1], data.d[guild].chess[i].extra, data.d[guild].chess[i].usr.username, data.d[guild].chess[i].init.username, 2, data.d[guild].chess[i].taken, j, i, 1);
                                    else
                                        await chessimg(data.d[guild].chess[i].data, [-1, -1, -1, -1], data.d[guild].chess[i].extra, data.d[guild].chess[i].init.username, data.d[guild].chess[i].usr.username, 3, data.d[guild].chess[i].taken, j, i, 1);
                                    let m = await client.channels.cache.get(data.d[guild][j][i].channel).send({ content: `The winner is ${data.d[guild].chess[i].usr},\n${data.d[guild].chess[i].init} timed out.`, files: [`${ddir}${j}.png`] });
                                    fs.unlinkSync(`${ddir}${j}.png`);
                                    chessgif(i, m);
                                }
                                else if (a) {
                                    if (data.d[guild].chess[i].color)
                                        await chessimg(data.d[guild].chess[i].data, [-1, -1, -1, -1], data.d[guild].chess[i].extra, data.d[guild].chess[i].usr.username, data.d[guild].chess[i].init.username, 3, data.d[guild].chess[i].taken, j, i, 1);
                                    else
                                        await chessimg(data.d[guild].chess[i].data, [-1, -1, -1, -1], data.d[guild].chess[i].extra, data.d[guild].chess[i].init.username, data.d[guild].chess[i].usr.username, 2, data.d[guild].chess[i].taken, j, i, 1);
                                    let m = await client.channels.cache.get(data.d[guild][j][i].channel).send({ content: `The winner is ${data.d[guild].chess[i].init},\n${data.d[guild].chess[i].usr} timed out.`, files: [`${ddir}${j}.png`] });
                                    fs.unlinkSync(`${ddir}${j}.png`);
                                    chessgif(i, m);
                                }
                                try {
                                    delete data.d[guild].message[data.d[guild].chessusr[data.d[guild].chess[i].init.id]];
                                } catch (e) { console.log(e); }
                                let temp = JSON.parse(JSON.stringify(i));
                                try {
                                    delete data.d[guild].chessusr[data.d[guild].chess[temp].usr.id];
                                } catch (e) { console.log(e); }
                                try {
                                    delete data.d[guild].chessusr[data.d[guild].chess[temp].init.id];
                                } catch (e) { console.log(e); }
                                try {
                                    delete data.d[guild].chess[temp];
                                } catch (e) { console.log(e); }
                                break;
                        }
                    }
                }
        }
    }
}, 60000);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(a) {
    if (rnd.length == 0) {
        let b = aes.aes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0, 0, 0, 0, data.ctr & 0xff000000, data.ctr & 0xff0000, data.ctr & 0xff00, data.ctr & 0xff]);
        data.ctr++;
        while (b.length > 0) {
            rnd.push(b.pop() * 0x01000000 + b.pop() * 0x00010000 + b.pop() * 0x00000100 + b.pop() * 0x00000001);
        }
    }
    return Math.floor((rnd.pop() / 0x100000000) * a);
}

setInterval(async function () {
    setStatus();
}, 300000);

function setStatus() {
    let n = new Date();
    let a = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0);
    let d = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 8, 0, 0, 0);
    let e = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 20, 0, 0, 0);
    let m = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 0, 0, 0);
    let z = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999);
    if (n.getTime() >= a.getTime() && n.getTime() <= d.getTime()) {
        if (data.status != 1 || 1) {
            client.user.setActivity('the moon', { type: ActivityType.Watching });
            client.user.setStatus('idle');
            data.status = 1;
        }
    }
    if (n.getTime() > d.getTime() && n.getTime() <= e.getTime()) {
        if (data.status != 2 || 1) {
            client.user.setActivity('you succeed', { type: ActivityType.Watching });
            client.user.setStatus('online');
            data.status = 2;
        }
    }
    if (n.getTime() > e.getTime() && n.getTime() <= m.getTime()) {
        if (data.status != 3 || 1) {
            client.user.setActivity('the stars', { type: ActivityType.Watching });
            client.user.setStatus('idle');
            data.status = 3;
        }
    }
    if (n.getTime() > m.getTime() && n.getTime() <= z.getTime()) {
        if (data.status != 4 || 1) {
            client.user.setActivity('sweet dreams', { type: ActivityType.Listening });
            client.user.setStatus('idle');
            data.status = 4;
        }
    }
}

setInterval(async function () {
    save();
}, 5000);

async function save() {
    data.save = new Date().toDateString();
    fs.writeFileSync(df, JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
    fs.writeFileSync(gf, JSON.stringify(games, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

async function exit() {
    save();
    client.user.setStatus('invisible');
    process.exit();
};

process.stdin.resume();

process.on('exit', () => {
    console.log('exit');
    exit();
});
process.on('SIGINT', () => {
    console.log('SIGINT');
    exit();
});
process.on('SIGTERM', () => {
    console.log('SIGTERM');
    exit();
});
process.on('SIGUSR1', () => {
    console.log('SIGUSR1');
    exit();
});
process.on('SIGUSR2', () => {
    console.log('SIGUSR2');
    exit();
});
process.on('cleanup', () => {
    console.log('cleanup');
    exit();
});

client.login(conf.token);
