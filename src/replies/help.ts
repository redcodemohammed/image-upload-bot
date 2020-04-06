import { ContextMessageUpdate } from "telegraf"

export default (ctx: ContextMessageUpdate) => {
    let reply = [
        `لرفع صورة, تأكد من ارسالها كملف, حتى لا يتم ضغط الصورة و التقليل من دقتها.`,
    ].join("\n");

    ctx.reply(reply);
}
