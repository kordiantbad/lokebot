const { client } = require("stoatbot.js");

const bot = new client({});

bot.on("ready", () => {
  console.log("Bot is ready!");
});

bot.on("message", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

bot.login(process.env.BOT_TOKEN);
