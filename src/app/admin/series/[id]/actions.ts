'use server';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/generated/prisma/client';

export async function updateSeries(id: string, formData: FormData) {
    const title = String(formData.get('title') ?? '').trim();
    const slug = String(formData.get('slug') ?? '').trim();
    const posterUrl = String(formData.get('posterUrl') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();

    if (!title || !slug || !posterUrl || !description) {
        throw new Error('Заполните все поля');
    }

    await db.media.update({
        where: {
            id,
        },
        data: {
            title,
            slug,
            posterUrl,
            description,
        },
    });

    redirect('/admin/series');
}

export async function deleteSeries(id: string) {
    await db.media.delete({
        where: {
            id,
        },
    });

    redirect('/admin/series');
}

export async function createSeason(mediaId: string, formData: FormData) {
    const number = Number(formData.get('number'));

    if (!Number.isInteger(number) || number < 1) {
        throw new Error('Некорректный номер сезона');
    }

    try {
        await db.season.create({
            data: {
                number,
                mediaId,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            throw new Error(`Сезон ${number} уже существует`);
        }

        throw error;
    }

    revalidatePath(`/admin/series/${mediaId}`);
}

export async function deleteSeason(seasonId: string, mediaId: string) {
    await db.season.delete({
        where: {
            id: seasonId,
        },
    });

    revalidatePath(`/admin/series/${mediaId}`);
}
