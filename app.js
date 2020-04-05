const telegraf = require("telegraf");
const axios = require("axios");

const api_home = "https://api.imgbb.com/1/upload";
const api_key = "8b9829fa45abad3ccbf76d25ab2b3af3";
const botToken = "716496504:AAEgHUn_g2luL53Vf7dEB29bCGUwj5uFHUQ";


const bot = new telegraf(botToken);

bot.start(ctx => {
    ctx.reply("Hello");
});

bot.on("photo", async ctx => {
    //get uploader info:
    let name = `${ctx.message.from.first_name}${ctx.message.from.last_name || ""}`
    //get the link:
    let link = await ctx.telegram.getFileLink(ctx.message.photo[0].file_id);

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

bot.launch();
