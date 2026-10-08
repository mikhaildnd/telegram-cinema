import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getEpisodeById } from '@/services/media.service';

import { deleteEpisode, updateEpisode } from './actions';

interface Props {
    params: Promise<{
        id: string;
        seasonId: string;
        episodeId: string;
    }>;
}

export default function AdminEpisodePage({ params }: Props) {
    return (
        <Suspense fallback={<AdminEpisodeSkeleton />}>
            <AdminEpisodeContent params={params} />
        </Suspense>
    );
}

async function AdminEpisodeContent({ params }: Props) {
    const { id, seasonId, episodeId } = await params;
    const episode = await getEpisodeById(episodeId);

    if (
        !episode ||
        episode.seasonId !== seasonId ||
        episode.season.mediaId !== id
    ) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div>
                <Link
                    href={`/admin/series/${id}/season/${seasonId}`}
                    className="text-sm text-gray-500 hover:text-gray-900"
                >
                    ← Сезон {episode.season.number}
                </Link>

                <h1 className="mt-2 text-2xl font-bold">
                    Эпизод {episode.number}
                </h1>
            </div>

            <form
                action={updateEpisode.bind(null, episode.id, id, seasonId)}
                className="mt-6 max-w-xl space-y-4"
            >
                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        Номер
                    </span>

                    <input
                        name="number"
                        type="number"
                        min={1}
                        defaultValue={episode.number}
                        required
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        Название
                    </span>

                    <input
                        name="title"
                        defaultValue={episode.title}
                        required
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        Telegram message ID
                    </span>

                    <input
                        name="telegramMessageId"
                        type="number"
                        min={1}
                        defaultValue={episode.telegramMessageId ?? ''}
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                    Сохранить
                </button>
            </form>

            <form
                action={deleteEpisode.bind(null, episode.id, id, seasonId)}
                className="mt-8"
            >
                <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
                >
                    Удалить эпизод
                </button>
            </form>
        </main>
    );
}

function AdminEpisodeSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
        </main>
    );
}
