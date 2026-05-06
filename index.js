const { client } = require("stoatbot.js");

const bot = new client({});
const prefix = "!";

async function addAllowedUser(name) {
  const binId = process.env.JSONBIN_BIN_ID;
  const masterKey = process.env.JSONBIN_MASTER_KEY;

  const getRes = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: {
      "X-Master-Key": masterKey
    }
  });

  const data = await getRes.json();
  const current = data.record;

  if (!current.allowedUsers) current.allowedUsers = [];

  if (!current.allowedUsers.includes(name)) {
    current.allowedUsers.push(name);
  }

  const putRes = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": masterKey
    },
    body: JSON.stringify(current)
  });

  return putRes.ok;
}

bot.on("ready", () => {
  console.log("Bot is ready!");
});

bot.on("error", (error) => {
  console.error("Bot error:", error);
});

bot.on("message", async (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    message.reply(
      `Commands:
!help - shows the commands and what they do
!lokestatus - bot answers with KK=Azizah and Religion=Jude
!quizlet time - WIP
!quizlet menu - sends menu code
!quizlet menu access "quizletname" - adds the name to allowedUsers
!noel - sends an image`
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

        const ok = await addAllowedUser(quizletname);
        if (ok) {
          message.reply(`Added **${quizletname}** to allowedUsers.`);
        } else {
          message.reply("Failed to update JSONBin.");
        }
      } else {
        message.reply(
          'javascript:(()=>{fetch("https://raw.githubusercontent.com/kordiantbad/quizlet-menu/refs/heads/main/quizletmenutest.js").then(r=>r.text()).then(code=>eval(code)).catch(e=>console.error("Failed to load script:",e));})();'
        );
      }
    }
  } else if (command === "noel") {
    message.channel.send({
      embeds: [
        {
          media: "0YswkV6DaBhtK8pe_WizJ6ciDEpk2XiR6z9uPo1vQS"
        }
      ]
    });
  }
});

bot.login(process.env.BOT_TOKEN);
