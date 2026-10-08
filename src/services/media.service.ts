import { db } from '@/lib/db';

export function getMediaList() {
    return db.media.findMany({
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
