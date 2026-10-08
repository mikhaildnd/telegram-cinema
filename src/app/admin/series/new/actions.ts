'use server';

import { MediaType } from '@/generated/prisma/client';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function createSeries(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim();
    const slug = String(formData.get('slug') ?? '').trim();
    const posterUrl = String(formData.get('posterUrl') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();

    if (!title || !slug || !posterUrl || !description) {
        throw new Error('Заполните все поля');
    }

    await db.media.create({
        data: {
            title,
            slug,
            posterUrl,
            description,
            type: MediaType.SERIES,
        },
    });

    redirect('/admin/series');
}
