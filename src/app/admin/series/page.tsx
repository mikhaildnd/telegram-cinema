import Link from 'next/link';
import { Suspense } from 'react';

import { MediaType } from '@/generated/prisma/client';
import { getMediaList } from '@/services/media.service';

export default function AdminSeriesPage() {
    return (
        <Suspense fallback={<AdminSeriesSkeleton />}>
            <AdminSeriesContent />
        </Suspense>
    );
}

async function AdminSeriesContent() {
    const series = await getMediaList(MediaType.SERIES);

    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Сериалы</h1>

                <Link
                    href="/admin/series/new"
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                >
                    Добавить сериал
                </Link>
            </div>

            <section className="mt-6 space-y-2">
                {series.map((item) => (
                    <Link
                        key={item.id}
                        href={`/admin/series/${item.id}`}
                        className="block rounded-xl bg-gray-100 px-4 py-4 transition hover:bg-gray-200"
                    >
                        {item.title}
                    </Link>
                ))}
            </section>
        </main>
    );
}

function AdminSeriesSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="h-8 w-32 animate-pulse rounded bg-zinc-900" />
        </main>
    );
}
