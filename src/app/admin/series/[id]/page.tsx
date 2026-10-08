import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getSeriesById } from '@/services/media.service';

import {
    createSeason,
    deleteSeason,
    deleteSeries,
    updateSeries,
} from './actions';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function AdminSeriesPage({ params }: Props) {
    return (
        <Suspense fallback={<AdminSeriesSkeleton />}>
            <AdminSeriesContent params={params} />
        </Suspense>
    );
}

async function AdminSeriesContent({ params }: Props) {
    const { id } = await params;
    const series = await getSeriesById(id);

    if (!series) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{series.title}</h1>

                <Link
                    href="/admin/series"
                    className="text-sm text-gray-500 hover:text-gray-900"
                >
                    Назад
                </Link>
            </div>

            <form
                action={updateSeries.bind(null, series.id)}
                className="mt-6 max-w-xl space-y-4"
            >
                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        Название
                    </span>
                    <input
                        name="title"
                        defaultValue={series.title}
                        required
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium">Slug</span>
                    <input
                        name="slug"
                        defaultValue={series.slug}
                        required
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        URL постера
                    </span>
                    <input
                        name="posterUrl"
                        defaultValue={series.posterUrl}
                        required
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        Описание
                    </span>
                    <textarea
                        name="description"
                        defaultValue={series.description}
                        required
                        rows={5}
                        className="w-full resize-none rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="rounded-md bg-green-300 px-4 py-2 text-sm font-medium text-white"
                >
                    Сохранить
                </button>
            </form>

            <section className="mt-10 max-w-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Сезоны</h2>

                    <form
                        action={createSeason.bind(null, series.id)}
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

                        <button
                            type="submit"
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                        >
                            Добавить
                        </button>
                    </form>
                </div>

                <div className="mt-4 space-y-2">
                    {series.seasons.map((season) => (
                        <div
                            key={season.id}
                            className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3"
                        >
                            <Link
                                href={`/admin/series/${series.id}/season/${season.id}`}
                                className="font-medium hover:underline"
                            >
                                Сезон {season.number}
                            </Link>

                            <form
                                action={deleteSeason.bind(
                                    null,
                                    season.id,
                                    series.id,
                                )}
                            >
                                <button
                                    type="submit"
                                    className="text-sm text-red-600 hover:text-red-700"
                                >
                                    Удалить
                                </button>
                            </form>
                        </div>
                    ))}

                    {series.seasons.length === 0 && (
                        <p className="text-sm text-gray-500">
                            Сезонов пока нет.
                        </p>
                    )}
                </div>
            </section>

            <form
                action={deleteSeries.bind(null, series.id)}
                className="mt-2"
            >
                <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
                >
                    Удалить сериал
                </button>
            </form>
        </main>
    );
}

function AdminSeriesSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
        </main>
    );
}
