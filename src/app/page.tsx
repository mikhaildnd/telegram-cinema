import { Catalog } from '@/components/Catalog';
import { Suspense } from 'react';
import { CatalogSkeleton } from '@/components/CatalogSkeleton';

export default function Home() {
    return (
        <Suspense fallback={<CatalogSkeleton />}>
            <Catalog />
        </Suspense>
    );
}
