export function CatalogSkeleton() {
    return (
        <main className="mx-auto w-full max-w-300 px-3 py-4">
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-zinc-800" />

            <section className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 md:gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-xl bg-zinc-900"
                    >
                        <div className="aspect-2/3 animate-pulse bg-zinc-800" />
                        <div className="h-5 w-3/4 animate-pulse bg-zinc-800 px-3 py-3" />
                    </div>
                ))}
            </section>
        </main>
    );
}
