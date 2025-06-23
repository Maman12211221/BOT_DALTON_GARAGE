const { AoiClient } = require("aoi.js");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot Aktif 24/7");
});

app.listen(3000, () => {
  console.log("Bot aktif di port 3000");
});

const bot = new AoiClient({
  token: process.env.TOKEN,
  prefix: "!",
  intents: ["MessageContent", "Guilds", "GuildMessages"]
});

// Slash command /ping
bot.command({
  name: "ping",
  description: "Cek respon bot",
  type: 1,
  code: "Pong! $pingms"
});

// Slash command /duty
bot.command({
  name: "duty",
  description: "Menandakan kamu sedang on duty sebagai mekanik",
  type: 1,
  code: `
$suppressErrors
$thumbnail[https://i.imgur.com/BJtkTlw.png]
$nomention
$onlyIf[$hasRole[$authorID;1327306460937457845]==true;Kamu gak punya role yang dibutuhin buat pake command ini!]
$onlyIf[$channelID==1386775123167809647;Command ini cuma bisa dipake di channel tertentu!]
$color[#00D1B2]
$author[🔧 DALTON•GARAGE | Duty Mekanik]
$title[🛠️ Mekanik Bertugas]
$description[
**👨‍🔧 Nama**
> \`$nickname\`

**📍 Status**
> 🟢 Aktif

**📝 Keterangan**
> Bertugas]
$footer[🔩 DALTON•GARAGE • On duty]
$addTimestamp
`
});

// Slash command /offduty
bot.command({
  name: "offduty",
  description: "Menandakan kamu selesai bertugas sebagai mekanik",
  type: 1,
  code: `
$suppressErrors
$nomention
$thumbnail[https://i.imgur.com/BJtkTlw.png]
$onlyIf[$hasRole[$authorID;1327306460937457845]==true;Kamu gak punya role yang dibutuhin buat pake command ini!]
$onlyIf[$channelID==1386775123167809647;Command ini cuma bisa dipake di channel tertentu!]
$color[#7F8C8D]
$author[🔧 DALTON•GARAGE | Duty Mekanik]
$title[🔕 Mekanik Selesai]
$description[
**👨‍🔧 Nama**
> \`$nickname\`

**📍 Status**
> 🔴 Off

**📝 Keterangan**
> Selesai]
$footer[🔩 DALTON•GARAGE • Of Duty]
$addTimestamp
`
});
