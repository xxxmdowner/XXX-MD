const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎵",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("SONG NAME FOR URL ❗");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Song metadata description
      let desc = `
*⬇️ XXX-MD  SONG DOWNLOADER ⬇️*

━━━━━━━━━━━━━━━━━━━━━━━━━━○►

> 🎈 *title* : ${data.title}

> 🍭 *description* : ${data.description}

> 🕛 *time* : ${data.timestamp}

> 🎁 *ago* : ${data.ago}

> 🪬 *views* : ${data.views}

> 🧸 *url* : ${data.url}
━━━━━━━━━━━━━━━━━━━━━━━━━━○►

> 𝗫𝗫𝗫-𝗠𝗗 🐼
`;

      // Send metadata thumbnail message
      await robin.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // Download the audio using @vreden/youtube_scraper
      const quality = "128"; // Default quality
      const songData = await ytmp3(url, quality);

      // Validate song duration (limit: 30 minutes)
      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ audio limit is 30 minitues");
      }

      // Send audio file
      await robin.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
        },
        { quoted: mek }
      );

      // Send as a document (optional)
      await robin.sendMessage(
        from,
        {
          document: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
          caption: "XXX-BOT",
        },
        { quoted: mek }
      );

      return reply("𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗕𝗬 𝗫𝗫𝗫-𝗠𝗗 💗");
    } catch (e) {
      console.log(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
