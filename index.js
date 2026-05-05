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
  }

  if (command === "placeholder1") {
    message.reply("placeholder 1");
  }

  if (command === "placeholder2") {
    message.reply("placeholder 2");
  }

  if (command === "placeholder3") {
    message.reply("placeholder 3");
  }

  if (command === "placeholder4") {
    message.reply("placeholder 4");
  }

  if (command === "placeholder5") {
    message.reply("placeholder 5");
  }

  if (command === "help") {
    message.reply(
      "Commands: !ping, !placeholder1, !placeholder2, !placeholder3, !placeholder4, !placeholder5, !help"
    );
  }
});

bot.login(process.env.BOT_TOKEN);
