import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("sticker", (ctx, next) => {
	ctx.reply(ctx.message.sticker.file_id);
	// ctx.replyWithSticker(ctx.message.sticker.file_id);
	next();
});

bot.on("animation", (ctx) => {
	ctx.reply(ctx.message.animation.file_id);
	// ctx.replyWithAnimation(ctx.message.animation.file_id);
	next();
});

bot.on("message", (ctx, next) => {
	if (ctx.message.forward_from) {
		ctx.reply("Forwarded from: " + ctx.message.forward_from.username);
		ctx.reply("ID: " + ctx.message.forward_from.id);
	}
	else if (ctx.message.forward_sender_name) {
		ctx.reply("Forwarded from: " + ctx.message.forward_sender_name);
		ctx.reply("ID: " + "Access denied!");
	}
	else
		next();
});

bot.start((ctx) => ctx.reply("Forward some message to me\nor send me some sticker or GIF"));

bot.on("message", (ctx) => ctx.reply("This is not a forwarded message!"));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));