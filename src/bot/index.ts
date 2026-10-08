import { Bot, InlineKeyboard } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

const bot = new Bot(token);

const miniAppUrl = process.env.TELEGRAM_MINI_APP_URL;

if (!miniAppUrl) {
    throw new Error('TELEGRAM_MINI_APP_URL is not defined');
}

bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard().webApp(
        '📺 Открыть каталог',
        miniAppUrl,
    );

    await ctx.reply(
        '🎬 Добро пожаловать в Кино!\n\nТвоя личная библиотека фильмов и сериалов.',
        {
            reply_markup: keyboard,
        },
    );
});

bot.on('channel_post', (ctx) => {
    console.log('chat_id:', ctx.chat.id);
    console.log('message_id:', ctx.channelPost.message_id);
});

void bot.start();
