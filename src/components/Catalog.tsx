import { MediaCard } from '@/components/MediaCard';
import { getMediaList } from '@/services/media.service';

export async function Catalog() {
    const media = await getMediaList();

    return (
        <main className="mx-auto w-full max-w-300 px-3 py-4">
            <h1 className="mb-6 text-2xl font-bold">Моя библиотека</h1>

            <section className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 md:gap-4">
                {media.map((item) => (
                    <MediaCard
                        key={item.slug}
                        slug={item.slug}
                        title={item.title}
                        posterUrl={item.posterUrl}
                    />
                ))}
            </section>
        </main>
    );
}
