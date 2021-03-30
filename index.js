import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("sticker", async(ctx, next) => {
	await ctx.reply(ctx.message.sticker.file_id);
	// ctx.replyWithSticker(ctx.message.sticker.file_id);
	next();
});

bot.on("animation", async(ctx, next) => {
	await ctx.reply(ctx.message.animation.file_id);
	// ctx.replyWithAnimation(ctx.message.animation.file_id);
	next();
});

bot.on("message", async(ctx, next) => {
	if (ctx.message.forward_from) {
		await ctx.reply("Forwarded from: " + ctx.message.forward_from.username);
		await ctx.reply("ID: " + ctx.message.forward_from.id);
	}
	else if (ctx.message.forward_sender_name) {
		await ctx.reply("Forwarded from: " + ctx.message.forward_sender_name);
		await ctx.reply("ID: " + "Access denied!");
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