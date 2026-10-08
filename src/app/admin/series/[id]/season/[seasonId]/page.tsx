import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getSeasonById } from '@/services/media.service';

import { createEpisode } from './actions';

interface Props {
    params: Promise<{
        id: string;
        seasonId: string;
    }>;
}

export default function AdminSeasonPage({ params }: Props) {
    return (
        <Suspense fallback={<AdminSeasonSkeleton />}>
            <AdminSeasonContent params={params} />
        </Suspense>
    );
}

async function AdminSeasonContent({ params }: Props) {
    const { id, seasonId } = await params;
    const season = await getSeasonById(seasonId);

    if (!season || season.mediaId !== id) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href={`/admin/series/${season.media.id}`}
                        className="text-sm text-gray-500 hover:text-gray-900"
                    >
                        ← {season.media.title}
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Сезон {season.number}
                    </h1>
                </div>
            </div>

            <section className="mt-8 max-w-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Эпизоды</h2>

                    <form
                        action={createEpisode.bind(
                            null,
                            season.id,
                            season.media.id,
                        )}
                        className="flex items-center gap-2"
                    >
                        <input
                            name="number"
                            type="number"
                            min={1}
                            placeholder="№"
                            required
                            className="w-20 rounded-lg bg-gray-100 px-3 py-2 outline-none"
                        />

                        <input
                            name="title"
                            placeholder="Название"
                            required
                            className="w-40 rounded-lg bg-gray-100 px-3 py-2 outline-none"
                        />

                        <input
                            name="telegramMessageId"
                            type="number"
                            min={1}
                            placeholder="Telegram ID"
                            className="w-32 rounded-lg bg-gray-100 px-3 py-2 outline-none"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                        >
                            Добавить
                        </button>
                    </form>
                </div>

                <div className="mt-4 space-y-2">
                    {season.episodes.map((episode) => (
                        <div
                            key={episode.id}
                            className="rounded-lg bg-gray-100 px-4 py-3"
                        >
                            <div className="flex items-center justify-between">
                                <Link
                                    href={`/admin/series/${id}/season/${seasonId}/episode/${episode.id}`}
                                    className="font-medium hover:underline"
                                >
                                    {episode.number}. {episode.title}
                                </Link>

                                <span className="text-sm text-gray-500">
                                    {episode.telegramMessageId
                                        ? `Telegram: ${episode.telegramMessageId}`
                                        : 'Telegram ID не указан'}
                                </span>
                            </div>
                        </div>
                    ))}

                    {season.episodes.length === 0 && (
                        <p className="text-sm text-gray-500">
                            Эпизодов пока нет.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

function AdminSeasonSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
        </main>
    );
}
