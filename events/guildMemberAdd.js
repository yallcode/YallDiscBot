const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    const channelId = process.env.WELCOME_CHANNEL_ID;
    if (!channelId) return;

    const channel = await client.channels.fetch(channelId).catch(() => null);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(`👋 Welcome to the YallCode Community!`)
      .setDescription(
        `Hey ${member}, we're super glad you're here! 🎉\n\n` +
        `This is a place for **programmers, creators, and gamers** to hang out, share projects, and help each other grow.\n\n` +
        `🔗 Check out **#rules** to get started and grab some roles!\n` +
        `💬 Introduce yourself in **#introductions**!\n` +
        `🛠️ Show off your projects in **#showcase**!`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Member #${member.guild.memberCount}` })
      .setTimestamp();

    await channel.send({ content: `<@${member.id}>`, embeds: [embed] });
  },
};
