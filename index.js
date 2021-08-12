import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("sticker", async (ctx, next) => {
	await ctx.reply("Sticker ID: " + ctx.message.sticker.file_id);
	// ctx.replyWithSticker(ctx.message.sticker.file_id);
	next();
});

bot.on("animation", async (ctx, next) => {
	await ctx.reply("GIF ID: " + ctx.message.animation.file_id);
	// ctx.replyWithAnimation(ctx.message.animation.file_id);
	next();
});

bot.on("photo", async (ctx, next) => {
	await ctx.reply("PIC : " + ctx.message.photo[0].file_id);
	next();
});

bot.on("document", async (ctx, next) => {
	await ctx.reply("PIC : " + ctx.message.document.file_id);
	next();
});


bot.start((ctx, next) => {
	if (!(ctx.message.forward_sender_name || ctx.message.forward_from))
		ctx.reply("Forward some message to me\nor send me some sticker or GIF");
	else
		next();
});

bot.on("message", async (ctx) => {
	if (ctx.message.forward_from) {
		await ctx.reply("Forwarded from: " + ctx.message.forward_from.username);
		await ctx.reply("ID: " + ctx.message.forward_from.id);
	}
	else if (ctx.message.forward_from_chat) {
		await ctx.reply("Forwarded from channel: " + ctx.message.forward_from_chat.title);
		await ctx.reply("ID: " + ctx.message.forward_from_chat.id);
	}
	else if (ctx.message.forward_sender_name) {
		await ctx.reply("Forwarded from: " + ctx.message.forward_sender_name);
		await ctx.reply("ID: " + "Access denied!");
	}
	else if (!(ctx.message.sticker || ctx.message.animation)) {
		ctx.reply("This is not a forwarded message!");
	}
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));