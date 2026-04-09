const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('links')
    .setDescription('Get all YallCode social links, projects, and resources'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xE67E22)
      .setTitle('🔗 YallCode — All Links')
      .setThumbnail('https://github.com/yallcode.png')
      .addFields(
        {
          name: '🌐 Website',
          value: '[yallcode.github.io/YallaYCode](https://yallcode.github.io/YallaYCode/)',
          inline: false,
        },
        {
          name: '📦 GitHub',
          value: '[github.com/yallcode](https://github.com/yallcode)',
          inline: true,
        },
        {
          name: '📺 YouTube',
          value: '[youtube.com/@YallaYCode](https://youtube.com/@YallaYCode)',
          inline: true,
        },
        {
          name: '🐦 Twitter / X',
          value: '[x.com/YallCode](https://x.com/YallCode)',
          inline: true,
        },
        {
          name: '💬 Discord Server',
          value: '[discord.gg/yUe8kE5fRF](https://discord.gg/yUe8kE5fRF)',
          inline: true,
        },
        {
          name: '🎮 Featured Projects',
          value:
            '• **GitDash** — Version control for GD editor (Geode Mod)\n' +
            '• **YallBotMod** — Macro bot for Geometry Dash\n' +
            '• **YallAnime** — Anime streaming site\n' +
            '• **py+** — Custom beginner-friendly programming language',
          inline: false,
        },
      )
      .setFooter({ text: 'YallDiscBot • Made by YallCode' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
