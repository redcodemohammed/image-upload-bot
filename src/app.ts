import telegraf from "telegraf";
import axios from "axios";
import http from "http";

const api_home = process.env.api;
const api_key = process.env.apiKey;
const botToken = process.env.token;
const port = process.env.PORT;

const bot = new telegraf(botToken);

import startReply from "./replies/start";
import helpReply from "./replies/help";

import upload from "./commands/upload";

bot.start(ctx => {
    let name = ctx.message.from.first_name.concat(` ${ctx.message.from.last_name || ""}`);
    ctx.reply(startReply(name));
});

bot.help(helpReply);


bot.on("document", upload(api_home, api_key));

bot.on("photo", ctx => {
    ctx.reply(`ارسل الصورة كملف لكي لا يتم ضغطها`);
});

bot.launch();

const server = http.createServer((req, res) => res.end("Bot is running, enjoy!"));
server.listen(port);
