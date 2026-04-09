const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const tips = [
  { tip: 'Name variables clearly. `userAge` beats `x` every time.', tag: 'Clean Code' },
  { tip: 'Commit often. Every commit is a checkpoint you can roll back to.', tag: 'Git' },
  { tip: 'Read error messages carefully — they usually tell you exactly what went wrong.', tag: 'Debugging' },
  { tip: 'Write code for humans first, computers second. Your future self will thank you.', tag: 'Best Practice' },
  { tip: 'Use `.env` files for secrets. Never hardcode tokens or passwords into your code!', tag: 'Security' },
  { tip: 'Break big problems into small ones. Solve them one at a time.', tag: 'Problem Solving' },
  { tip: 'Google is not cheating. Even senior devs look things up every day.', tag: 'Mindset' },
  { tip: 'Don\'t optimize early. First make it work, then make it fast.', tag: 'Performance' },
  { tip: 'Version control is your safety net. Use GitHub for everything.', tag: 'Git' },
  { tip: 'Functions should do one thing and do it well.', tag: 'Clean Code' },
  { tip: 'A good README is the best documentation. Always write one.', tag: 'Documentation' },
  { tip: 'Rest when you\'re stuck. Your brain solves problems in the background.', tag: 'Mindset' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dev')
    .setDescription('Get a random programming tip'),

  async execute(interaction) {
    const { tip, tag } = tips[Math.floor(Math.random() * tips.length)];

    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setTitle('💡 Dev Tip')
      .setDescription(`*"${tip}"*`)
      .setFooter({ text: `Tag: ${tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
