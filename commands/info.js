const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Display info about this server'),

  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();

    const online = guild.members.cache.filter(m => m.presence?.status === 'online').size;
    const bots = guild.members.cache.filter(m => m.user.bot).size;
    const humans = guild.memberCount - bots;

    const embed = new EmbedBuilder()
      .setColor(0x2ECC71)
      .setTitle(`📊 ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
        { name: '👥 Members', value: `${guild.memberCount} total (${humans} humans, ${bots} bots)`, inline: false },
        { name: '🟢 Online', value: `${online}`, inline: true },
        { name: '💬 Channels', value: `${guild.channels.cache.size}`, inline: true },
        { name: '🎭 Roles', value: `${guild.roles.cache.size}`, inline: true },
      )
      .setFooter({ text: `Server ID: ${guild.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
