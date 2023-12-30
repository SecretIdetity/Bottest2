const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dice = require('../modules/dice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r')
        .setDescription('Roll some Dice (use h/help)')
        .addStringOption(option =>
            option.setName('roll')
                .setDescription('A String using the dice syntax or help')
                .setRequired(true)),
    async execute(i) {
        if (i.options.getString('roll') == 'help' || i.options.getString('roll') == 'h') {
            const embed = new EmbedBuilder()
                .setColor('#1a57f0')
                .setTitle('Rolling Dice:')
                .addFields(
                    { name: 'General', value: `The features are mostly from [Dice Maiden](<https://github.com/Humblemonk/DiceMaiden>) and [Foundry](<https://foundryvtt.com/article/dice-modifiers/>), it processes from left to right (case and space insensitive).` },
                    { name: 'Basic Syntax', value: `x **t** y **d** z processes the entire thing x times.\nUse any modifiers after that.` },
                    { name: 'Advanced Syntax', value: `The explode, reroll and success/failure modifiers all support adding he/>=, h/>, le/<=, l/< (nothing is ==) and a number after them.` },
                    { name: 'Infinite', value: `VAL: **i**xx\nAdding i before explode or reroll makes it iterate **i**nfinitely-ish.` },
                    { name: 'Explode', value: `VAL: **e**\nIf the conditions after **e** are met, another roll is made.` },
                    { name: 'Reroll', value: `VAL: **r**\nIf the conditions after **r** are met, the throw is **r**erolled.` },
                    { name: 'Keep / Drop', value: `VAL: **k**/**kh**, **kl**, **dl**, **dh**\n**D**rops or **k**eeps the **h**ighest or **l**owest throws.` },
                    { name: 'Min / Max', value: `VAL: **min**,**max**\nMakes every throw either higher than the **min**inimum or/and lower than the **max**imum.` },
                    { name: 'Even / Odd', value: `VAL: **ev**/**even**, **od**/**odd**\nCounts the amount of **even**/**odd** number.` },
                    { name: 'Count', value: `VAL: **cs**,**cf**\n**C**ounts **s**uccesses and/or **f**ailures according to the conditions after it.` },
                    { name: 'Subtract / Deduct Failures', value: `VAL: **sf**, **df**\n**D**educt (-1) or **s**ubtract every failed value.` },
                    { name: 'Output:', value: `normal, **success**, __failure__, ~~discarded~~.` }
                ); //copied from index.js
            i.reply({ embeds: [embed] });
        }
        else{
            i.reply(dice.roll(i.options.getString('roll')));
        }

    }
}