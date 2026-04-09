const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('See all YallDiscBot commands'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('🤖 YallDiscBot — Command List')
      .setDescription('Here\'s everything I can do:')
      .addFields(
        { name: '🛠️ General', value: '`/ping` — Check bot latency\n`/help` — Show this menu\n`/info` — Server info' },
        { name: '📢 Announcements', value: '`/announce` — Post a server announcement *(Admin only)*' },
        { name: '🔗 Links', value: '`/links` — Get all YallCode social links & projects' },
        { name: '🤝 Community', value: '`/project` — Share your project in showcase\n`/dev` — Look up a dev tip' },
      )
      .setFooter({ text: 'YallDiscBot • Made by YallCode', iconURL: 'https://github.com/yallcode.png' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
