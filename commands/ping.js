const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if YallDiscBot is alive and see latency'),

  async execute(interaction, client) {
    const sent = await interaction.reply({ content: '🏓 Pinging...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply({
      content: '',
      embeds: [
        new EmbedBuilder()
          .setColor(latency < 100 ? 0x57F287 : latency < 300 ? 0xFEE75C : 0xED4245)
          .setTitle('🏓 Pong!')
          .addFields(
            { name: 'Bot Latency', value: `\`${latency}ms\``, inline: true },
            { name: 'API Latency', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true },
          )
          .setTimestamp(),
      ],
    });
  },
};
