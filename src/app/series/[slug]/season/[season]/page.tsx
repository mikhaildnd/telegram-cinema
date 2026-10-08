import Link from 'next/link';
import { Suspense } from 'react';

import { getTelegramMessageUrl } from '@/data/telegram';
import { series } from '@/data/series';

export function generateStaticParams() {
    return series.flatMap((item) =>
        item.seasons.map((season) => ({
            slug: item.slug,
            season: String(season.number),
        })),
    );
}

type SeasonPageProps = {
    params: Promise<{
        slug: string;
        season: string;
    }>;
};

export default function SeasonPage({ params }: SeasonPageProps) {
    return (
        <Suspense fallback={<SeasonPageSkeleton />}>
            <SeasonContent params={params} />
        </Suspense>
    );
}

async function SeasonContent({ params }: SeasonPageProps) {
    const { slug, season: seasonParam } = await params;

    const item = series.find((series) => series.slug === slug);
    const seasonNumber = Number(seasonParam);

    const season = item?.seasons.find(
        (season) => season.number === seasonNumber,
    );

    if (!item || !season) {
        return <div>Сезон не найден</div>;
    }

    return (
        <main className="mx-auto w-full max-w-300 px-3 py-4">
            <Link
                href={`/series/${item.slug}`}
                className="text-sm text-zinc-400 hover:text-white"
            >
                ← {item.title}
            </Link>

            <h1 className="mt-6 text-2xl font-bold">Сезон {season.number}</h1>

            <section className="mt-6 space-y-3">
                {season.episodes.map((episode) => {
                    if (!episode.telegramMessageId) {
                        return (
                            <div
                                key={episode.number}
                                className="rounded-xl bg-zinc-900 px-4 py-4"
                            >
                                <span className="text-zinc-400">
                                    {episode.number}.
                                </span>{' '}
                                {episode.title}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={episode.number}
                            href={getTelegramMessageUrl(
                                episode.telegramMessageId,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-4 text-white transition hover:bg-zinc-800"
                        >
                            <div>
                                <span className="text-zinc-400">
                                    {episode.number}.
                                </span>{' '}
                                {episode.title}
                            </div>

                            <span>▶</span>
                        </Link>
                    );
                })}
            </section>
        </main>
    );
}

function SeasonPageSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-3 py-4">
            <div className="h-8 w-32 animate-pulse rounded bg-zinc-900" />
        </main>
    );
}
