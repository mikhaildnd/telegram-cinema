import { db } from '@/lib/db';
import { MediaType } from '@/generated/prisma/client';

export function getMediaList(type?: MediaType) {
    return db.media.findMany({
        where: type
            ? {
                  type,
              }
            : undefined,
        orderBy: {
            title: 'asc',
        },
    });
}

export function getSeriesBySlug(slug: string) {
    return db.media.findUnique({
        where: {
            slug,
            type: 'SERIES',
        },
        include: {
            seasons: {
                orderBy: {
                    number: 'asc',
                },
                include: {
                    episodes: {
                        orderBy: {
                            number: 'asc',
                        },
                    },
                },
            },
        },
    });
}

export function getSeasonBySlug(slug: string, seasonNumber: number) {
    return db.season.findFirst({
        where: {
            number: seasonNumber,
            media: {
                slug,
                type: 'SERIES',
            },
        },
        include: {
            media: true,
            episodes: {
                orderBy: {
                    number: 'asc',
                },
            },
        },
    });
}

export function getSeriesById(id: string) {
    return db.media.findUnique({
        where: {
            id,
            type: 'SERIES',
        },
        include: {
            seasons: {
                orderBy: {
                    number: 'asc',
                },
            },
        },
    });
}

export function getSeasonById(id: string) {
    return db.season.findUnique({
        where: {
            id,
        },
        include: {
            media: true,
            episodes: {
                orderBy: {
                    number: 'asc',
                },
            },
        },
    });
}

export function getEpisodeById(id: string) {
    return db.episode.findUnique({
        where: {
            id,
        },
        include: {
            season: {
                include: {
                    media: true,
                },
            },
        },
    });
}
