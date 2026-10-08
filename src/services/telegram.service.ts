import { db } from '@/lib/db';

interface SyncTelegramEpisodeParams {
    slug: string;
    seasonNumber: number;
    episodeNumber: number;
    telegramMessageId: number;
}

export async function syncTelegramEpisode({
    slug,
    seasonNumber,
    episodeNumber,
    telegramMessageId,
}: SyncTelegramEpisodeParams) {
    return db.$transaction(async (tx) => {
        let media = await tx.media.findUnique({
            where: { slug },
        });

        if (!media) {
            media = await tx.media.create({
                data: {
                    slug,
                    title: slug,
                    type: 'SERIES',
                },
            });
        }

        let season = await tx.season.findUnique({
            where: {
                mediaId_number: {
                    mediaId: media.id,
                    number: seasonNumber,
                },
            },
        });

        if (!season) {
            season = await tx.season.create({
                data: {
                    mediaId: media.id,
                    number: seasonNumber,
                },
            });
        }

        return tx.episode.upsert({
            where: {
                seasonId_number: {
                    seasonId: season.id,
                    number: episodeNumber,
                },
            },
            create: {
                seasonId: season.id,
                number: episodeNumber,
                title: `Episode ${episodeNumber}`,
                telegramMessageId,
            },
            update: {
                telegramMessageId,
            },
        });
    });
}
