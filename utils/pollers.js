const fetch = require('node-fetch');
const xml2js = require('xml2js');

// Simple in-memory store for "last seen" IDs
const seen = {
  ytVideoId: null,
  githubRepoIds: new Set(),
  initialized: false,
};

// ─── YouTube RSS Poller ──────────────────────────────────────────────────────
// Uses YouTube's public RSS feed — no API key needed!
async function checkYouTube(client) {
  const channelId = process.env.YT_CHANNEL_ID;
  if (!channelId) return;

  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(url);
    if (!res.ok) return;

    const xml = await res.text();
    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const entries = parsed?.feed?.entry;
    if (!entries) return;

    // entries can be array or single object
    const latest = Array.isArray(entries) ? entries[0] : entries;
    const videoId = latest?.['yt:videoId'];
    const title = latest?.title;
    const link = latest?.link?.$?.href;
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const author = latest?.author?.name;

    // On first run, just save the latest video ID without posting
    if (!seen.initialized) {
      seen.ytVideoId = videoId;
      return;
    }

    if (videoId && videoId !== seen.ytVideoId) {
      seen.ytVideoId = videoId;

      const discordChannelId = process.env.YOUTUBE_CHANNEL_ID;
      if (!discordChannelId) return;

      const channel = await client.channels.fetch(discordChannelId).catch(() => null);
      if (!channel) return;

      await channel.send({
        content: `🎬 **New video from @YallaYCode!** <@&everyone>`,
        embeds: [{
          color: 0xFF0000,
          title: title || 'New Video',
          url: link,
          author: { name: author || 'YallaYCode', icon_url: 'https://www.youtube.com/favicon.ico' },
          description: '📺 A brand new video just dropped! Go check it out!',
          image: { url: thumbnail },
          footer: { text: 'YouTube • YallaYCode' },
          timestamp: new Date().toISOString(),
        }],
      });
      console.log(`📺 Posted new YouTube video: ${title}`);
    }
  } catch (err) {
    console.error('YouTube poll error:', err.message);
  }
}

// ─── GitHub Repo Poller ──────────────────────────────────────────────────────
async function checkGitHub(client) {
  const username = process.env.GITHUB_USERNAME || 'yallcode';
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers = { 'User-Agent': 'YallDiscBot' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=5`, { headers });
    if (!res.ok) return;

    const repos = await res.json();

    // On first run, populate existing repos without posting
    if (!seen.initialized) {
      repos.forEach(r => seen.githubRepoIds.add(r.id));
      return;
    }

    for (const repo of repos) {
      if (!seen.githubRepoIds.has(repo.id)) {
        seen.githubRepoIds.add(repo.id);

        const discordChannelId = process.env.GITHUB_CHANNEL_ID;
        if (!discordChannelId) continue;

        const channel = await client.channels.fetch(discordChannelId).catch(() => null);
        if (!channel) continue;

        const lang = repo.language ? `\`${repo.language}\`` : 'No language detected';
        const topics = repo.topics?.length ? repo.topics.map(t => `\`${t}\``).join(' ') : 'None';

        await channel.send({
          embeds: [{
            color: 0x238636,
            title: `📦 New Repo: ${repo.name}`,
            url: repo.html_url,
            author: { name: username, url: `https://github.com/${username}`, icon_url: `https://github.com/${username}.png` },
            description: repo.description || '*(No description)*',
            fields: [
              { name: '📝 Language', value: lang, inline: true },
              { name: '⭐ Stars', value: `${repo.stargazers_count}`, inline: true },
              { name: '🔖 Topics', value: topics, inline: false },
            ],
            footer: { text: 'GitHub • yallcode' },
            timestamp: repo.created_at,
          }],
        });
        console.log(`📦 Posted new GitHub repo: ${repo.name}`);
      }
    }
  } catch (err) {
    console.error('GitHub poll error:', err.message);
  }
}

// ─── Start Polling ────────────────────────────────────────────────────────────
function startPollers(client) {
  console.log('🔄 Starting pollers...');

  // Initial silent pass to seed "last seen" state
  Promise.all([checkYouTube(client), checkGitHub(client)]).then(() => {
    seen.initialized = true;
    console.log('✅ Pollers initialized — watching for new content!');
  });

  // Check YouTube every 5 minutes
  setInterval(() => checkYouTube(client), 5 * 60 * 1000);

  // Check GitHub every 10 minutes
  setInterval(() => checkGitHub(client), 10 * 60 * 1000);
}

module.exports = { startPollers };
