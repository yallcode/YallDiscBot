# 🤖 YallDiscBot

The official Discord bot for the **YallCode** community — auto-posts YouTube uploads, new GitHub repos, welcomes members, and runs slash commands.

[![Deploy](https://img.shields.io/badge/host-Railway-blueviolet)](https://railway.app)
[![discord.js](https://img.shields.io/badge/discord.js-v14-blue)](https://discord.js.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📺 YouTube Notifications | Auto-posts new video uploads to a designated channel |
| 📦 GitHub Notifications | Auto-posts new repos created under `yallcode` |
| 👋 Welcome Messages | Greets new members with a friendly embed |
| 📢 `/announce` | Admin-only announcement command with color choices |
| 🔗 `/links` | Posts all YallCode social links and projects |
| 📊 `/info` | Shows server stats |
| 💡 `/dev` | Random programming tips |
| 🏓 `/ping` | Check bot latency |

---

## 🚀 Setup

### 1. Clone the repo
```bash
git clone https://github.com/yallcode/YallDiscBot.git
cd YallDiscBot
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your values in .env
```

### 3. Register slash commands
```bash
npm run deploy
```

### 4. Start the bot
```bash
npm start
```

---

## 🌐 Hosting (Railway — Free Tier)

Since you're on a Chromebook, run the bot 24/7 on **Railway**:

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub Repo
2. Select `YallDiscBot`
3. Go to **Variables** and add all your `.env` values as secrets
4. Railway auto-deploys on every push to `main` ✅

---

## 🔐 GitHub Secrets (for Actions)

Add these in your repo → **Settings → Secrets → Actions**:

| Secret | Value |
|---|---|
| `DISCORD_TOKEN` | Your bot token |
| `CLIENT_ID` | Your bot's application ID |
| `GUILD_ID` | Your Discord server ID |

---

## 📁 Project Structure

```
YallDiscBot/
├── index.js              # Bot entry point
├── deploy-commands.js    # Register slash commands
├── package.json
├── .env.example
├── commands/
│   ├── ping.js
│   ├── help.js
│   ├── info.js
│   ├── links.js
│   ├── dev.js
│   └── announce.js
├── events/
│   ├── ready.js
│   └── guildMemberAdd.js
├── utils/
│   └── pollers.js        # YouTube & GitHub polling
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🔗 Community

- 🌐 [yallcode.github.io/YallaYCode](https://yallcode.github.io/YallaYCode/)
- 💬 [discord.gg/yUe8kE5fRF](https://discord.gg/yUe8kE5fRF)
- 📺 [youtube.com/@YallaYCode](https://youtube.com/@YallaYCode)
- 🐦 [x.com/YallCode](https://x.com/YallCode)

---

Made with ❤️ by [YallCode](https://github.com/yallcode)
