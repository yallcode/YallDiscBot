const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Post an announcement to the announcements channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('title').setDescription('Title of the announcement').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('message').setDescription('The announcement message').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('color')
        .setDescription('Embed color')
        .setRequired(false)
        .addChoices(
          { name: '🔵 Blue', value: 'blue' },
          { name: '🟢 Green', value: 'green' },
          { name: '🔴 Red', value: 'red' },
          { name: '🟡 Yellow', value: 'yellow' },
          { name: '🟣 Purple', value: 'purple' },
        )
    ),

  async execute(interaction, client) {
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    const colorChoice = interaction.options.getString('color') || 'blue';

    const colorMap = {
      blue: 0x5865F2,
      green: 0x57F287,
      red: 0xED4245,
      yellow: 0xFEE75C,
      purple: 0x9B59B6,
    };

    const channelId = process.env.ANNOUNCEMENTS_CHANNEL_ID;
    const channel = channelId
      ? await client.channels.fetch(channelId).catch(() => null)
      : interaction.channel;

    if (!channel) {
      return interaction.reply({ content: '❌ Announcements channel not found. Check your `.env`!', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(colorMap[colorChoice])
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await channel.send({ content: '@everyone', embeds: [embed] });
    await interaction.reply({ content: '✅ Announcement posted!', ephemeral: true });
  },
};
