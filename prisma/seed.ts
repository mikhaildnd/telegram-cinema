import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { MediaType, PrismaClient } from '@/generated/prisma/client';
import { series } from '@/data/series';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    for (const item of series) {
        await prisma.media.create({
            data: {
                slug: item.slug,
                title: item.title,
                type: MediaType.SERIES,
                posterUrl: item.posterUrl,
                description: item.description,
                seasons: {
                    create: item.seasons.map((season) => ({
                        number: season.number,
                        episodes: {
                            create: season.episodes.map((episode) => ({
                                number: episode.number,
                                title: episode.title,
                                telegramMessageId: episode.telegramMessageId,
                            })),
                        },
                    })),
                },
            },
        });
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
