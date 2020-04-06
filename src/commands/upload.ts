import { ContextMessageUpdate } from "telegraf";
import axios from "axios";

export default (api_home: string, api_key: string) => async (ctx: ContextMessageUpdate) => {
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

}
