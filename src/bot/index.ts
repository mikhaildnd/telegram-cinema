import { Bot, InlineKeyboard } from 'grammy';
import { parseEpisodeFileName } from '@/lib/telegram/parse-episode-file-name';
import { syncTelegramEpisode } from '@/services/telegram.service';

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

bot.on('channel_post', async (ctx) => {
    const message = ctx.channelPost;

    const fileName =
        message.video?.file_name ??
        (message.document?.mime_type?.startsWith('video/')
            ? message.document.file_name
            : undefined);

    if (!fileName) {
        return;
    }

    const episode = parseEpisodeFileName(fileName);

    if (!episode) {
        return;
    }

    try {
        await syncTelegramEpisode({
            ...episode,
            telegramMessageId: message.message_id,
        });

        console.log(
            `Episode ${episode.slug}:s${String(episode.seasonNumber).padStart(2, '0')}e${String(episode.episodeNumber).padStart(2, '0')} linked to Telegram message ${message.message_id}`,
        );
    } catch (error) {
        console.error('Failed to sync Telegram episode:', error);
    }
});

void bot.start();
