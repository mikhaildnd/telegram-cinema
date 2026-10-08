import Image from 'next/image';
import Link from 'next/link';

interface MediaCardProps {
    slug: string;
    title: string;
    posterUrl: string | null;
}

export function MediaCard({ title, posterUrl, slug }: MediaCardProps) {
    return (
        <Link href={`/series/${slug}`}>
            <article className="overflow-hidden rounded-xl bg-zinc-900">
                <div className="relative aspect-2/3">
                    {posterUrl ? (
                        <Image
                            src={posterUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 50vw, 200px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-zinc-900 text-gray-300">
                            Нет постера
                        </div>
                    )}
                </div>

                <h2 className="truncate px-3 py-3 text-sm font-medium">
                    {title}
                </h2>
            </article>
        </Link>
    );
}
