import Link from 'next/link';

export default function AdminPage() {
    return (
        <main className="mx-auto w-full max-w-300 px-4 py-6">
            <h1 className="text-2xl font-bold">Админка</h1>

            <Link
                href="/admin/series"
                className="mt-6 block rounded-xl bg-zinc-900 px-4 py-4 text-white"
            >
                Сериалы
            </Link>
        </main>
    );
}
