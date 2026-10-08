import Link from 'next/link';

import { createSeries } from './actions';

export default function NewSeriesPage() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Новый сериал</h1>

                <Link
                    href="/admin/series"
                    className="text-sm text-zinc-400 hover:text-zinc-500"
                >
                    Назад
                </Link>
            </div>

            <form
                action={createSeries}
                className="mt-6 max-w-xl space-y-4"
            >
                <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                        Название
                    </span>
                    <input
                        name="title"
                        required
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium">Slug</span>
                    <input
                        name="slug"
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
                        // type="url"
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
                        required
                        rows={5}
                        className="w-full resize-none rounded-lg bg-gray-100 px-4 py-3 outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="rounded-md bg-green-300 px-4 py-2 text-sm font-medium text-black"
                >
                    Создать сериал
                </button>
            </form>
        </main>
    );
}
