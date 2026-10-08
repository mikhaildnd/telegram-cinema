import Image from 'next/image';
import { Suspense } from 'react';
import Link from 'next/link';

import { series } from '@/data/series';

type SeriesPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return series.map((item) => ({
        slug: item.slug,
    }));
}

export default function SeriesPage({ params }: SeriesPageProps) {
    return (
        <Suspense fallback={<SeriesPageSkeleton />}>
            <SeriesContent params={params} />
        </Suspense>
    );
}

async function SeriesContent({ params }: SeriesPageProps) {
    const { slug } = await params;

    const item = series.find((series) => series.slug === slug);

    if (!item) {
        return <div>Сериал не найден</div>;
    }

    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <section className="flex flex-col gap-4 sm:flex-row">
                <div className="relative mx-auto w-48 shrink-0 overflow-hidden rounded-xl sm:mx-0">
                    <Image
                        src={item.posterUrl}
                        alt={item.title}
                        width={300}
                        height={450}
                        className="h-auto w-full object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-center text-3xl font-bold text-black">
                        {item.title}
                    </h1>

                    <p className="mt-4 text-zinc-400">{item.description}</p>
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-xl font-semibold">Сезоны</h2>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {item.seasons.map((season) => (
                        <Link
                            key={season.number}
                            href={`/series/${item.slug}/season/${season.number}`}
                            className="rounded-xl bg-zinc-900 px-4 py-5 text-center font-medium text-white transition hover:bg-zinc-800"
                        >
                            Сезон {season.number}
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

function SeriesPageSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="h-96 animate-pulse rounded-xl bg-zinc-900" />
        </main>
    );
}
