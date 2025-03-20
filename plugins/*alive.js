const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["a", "btal", "al"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🐼",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `
┌──❮❮𝗫𝗫𝗫-𝗠𝗗❯❯──◯➤
│ 
│➬ 𝗼𝘄𝗻𝗲𝗿 : 𝗖𝗬𝗕𝗘𝗥 𝗗𝗜𝗡𝗨 𝗜𝗗
│➬ 𝘁𝗲𝗮𝗺 : 𝗟𝗢𝗗 ᵀᴹ ©
│➬ 𝗽𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : 𝗵𝗲𝗿𝗼𝗸𝘂 
│➬ 𝘃𝗲𝗿𝘀𝗶𝗼𝗻 : 1.0.0
│➬ 𝗻𝘂𝗺𝗯𝗲𝗿 : 94764972683
│
└─────────────◯➤

> 𝗫𝗫𝗫-𝗠𝗗      🐼
        `;

        // Send audio
        await conn.sendMessage(from, {audio: { url: 'https://github.com/WIHANGA-01/OUR-BAS/raw/refs/heads/main/vc/velcomtomd.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
    
        await conn.sendMessage(
            from,
            {
                video: { url: `https://github.com/WIHANGA-01/OUR-BAS/raw/refs/heads/main/vc/InShot_20250316_194240341.mp4` },
                caption: status,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363401928208566@newsletter',
                        newsletterName: '𝗫𝗫𝗫-𝗠𝗗 ➝',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );


        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})
