const { client } = require("stoatbot.js");

const bot = new client({});

const prefix = "!";

bot.on("ready", () => {
  console.log("Bot is ready!");
});

bot.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply("pong");
  } else if (command === "placeholder1") {
    message.reply("placeholder 1");
  } else if (command === "placeholder2") {
    message.reply("placeholder 2");
  } else if (command === "placeholder3") {
    message.reply("placeholder 3");
  } else if (command === "placeholder4") {
    message.reply("placeholder 4");
  } else if (command === "placeholder5") {
    message.reply("placeholder 5");
  } else if (command === "help") {
    message.reply(
      `**Commands**
!ping - replies pong
!placeholder1 - placeholder command 1
!placeholder2 - placeholder command 2
!placeholder3 - placeholder command 3
!placeholder4 - placeholder command 4
!placeholder5 - placeholder command 5
!help - shows this help message`
    );
  }
});

bot.login(process.env.BOT_TOKEN);
