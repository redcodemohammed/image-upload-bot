const telegraf = require("telegraf");
const axios = require("axios");
const http = require("http");
const server = http.createServer((req, res) => res.end("Bot is running, enjoy!"));

const api_home = "https://api.imgbb.com/1/upload";
const api_key = "8b9829fa45abad3ccbf76d25ab2b3af3";
const botToken = "716496504:AAEgHUn_g2luL53Vf7dEB29bCGUwj5uFHUQ";
const port = process.env.PORT;

const bot = new telegraf(botToken);

bot.start(ctx => {
    ctx.reply(`مرحبا, عن ارسال صورة تأكد من ارسالها كملف لكي لا تقل دقتها`);
});

bot.on("document", async ctx => {
    if (!(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(ctx.message.document.file_name)) {
        ctx.reply(`الرجاء ارسال صورة`);
    }
    //get uploader info:
    let name = `${ctx.message.from.first_name}${ctx.message.from.last_name || ""}`
    //get the link:
    let link = await ctx.telegram.getFileLink(ctx.message.document.file_id);

    //upload:
    let api = `${api_home}?key=${api_key}&name=${name}&image=${link}`;
    try {

        let upload = await axios.default.get(api);
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
server.listen(port);
