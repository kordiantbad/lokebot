const { client } = require("stoatbot.js");

const bot = new client({});
const prefix = "!";

bot.on("ready", () => {
  console.log("Bot is ready!");
});

bot.on("message", async (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    message.reply(
      `Commands:
!help - shows the commands and what they do
!lokestatus - shows lokes status
!quizlet time - WIP
!quizlet menu - sends menu code
!quizlet menu access "quizletname" - adds quizletname to allowedUsers`
    );
  } else if (command === "lokestatus") {
    message.reply("KK=Azizah\nReligion=Jude");
  } else if (command === "quizlet") {
    const sub = args[0]?.toLowerCase();

    if (sub === "time") {
      message.reply("WIP");
    } else if (sub === "menu") {
      if (args[1]?.toLowerCase() === "access") {
        const quizletname = args.slice(2).join(" ").replace(/"/g, "");
        if (!quizletname) return message.reply("Please provide a quizlet name.");

        // PUT YOUR JSONBIN UPDATE LOGIC HERE
        message.reply(`Would add ${quizletname} to allowedUsers.`);
      } else {
        message.reply(
          `javascript:(()=>{fetch("https://raw.githubusercontent.com/kordiantbad/quizlet-menu/refs/heads/main/quizletmenutest.js").then(r=>r.text()).then(code=>eval(code)).catch(e=>console.error("Failed to load script:",e));})();`
        );
      }
    }
  }
});

bot.login(process.env.BOT_TOKEN);
