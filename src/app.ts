import telegraf from "telegraf";
import axios from "axios";
import http from "http";

const api_home = process.env.api;
const api_key = process.env.apiKey;
const botToken = process.env.token;
const port = process.env.PORT;

const bot = new telegraf(botToken);

bot.start(ctx => {
    ctx.reply(`مرحبا, عند ارسال صورة تأكد من ارسالها كملف لكي لا تقل دقتها`);
});


bot.on("document", async ctx => {
    if (!(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(ctx.message.document.file_name)) {
        return ctx.reply(`الرجاء ارسال صورة`);
    }
    //get uploader info:
    let name = `${ctx.message.from.first_name}${ctx.message.from.last_name || ""}`
    //get the link:
    let link = await ctx.telegram.getFileLink(ctx.message.document.file_id);

    //upload:
    let api = `${api_home}?key=${api_key}&name=${name}&image=${link}`;
    try {

        let upload = await axios.get(api);
        let imageLink = upload.data.data.image.url;
        ctx.reply(`تم رفع الصورة على الرابط ${imageLink}.`);
    } catch (err) {
        ctx.reply(err);
    }

});
bot.on("photo", ctx => {
    ctx.reply(`ارسل الصورة كملف لكي لا يتم ضغطها`);
});
bot.launch();

const server = http.createServer((req, res) => res.end("Bot is running, enjoy!"));
server.listen(port);
